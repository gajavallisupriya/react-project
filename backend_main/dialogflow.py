import email
from re import search
import sqlite3
import time
from grpc import method_handlers_generic_handler
import schedule
from main import document_upload
from selenium.webdriver.chrome.options import Options
from flask import Flask,request
from selenium.webdriver.common.keys import Keys
import json
from flask_mail import Mail,Message
from flask_cors import CORS
from selenium import webdriver
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=chrome_options)
driver.get("https://console.dialogflow.com/api-client/demo/embedded/5fc0d92d-a76b-4617-9419-4a1d3758336d")
searchbox = driver.find_element_by_xpath('//*[@id="query"]')
from databaseOp import putquestion
from apscheduler.schedulers.background import BackgroundScheduler
from databaseOp import getIndex
app = Flask(__name__)
mail = Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
#app.config['MAIL_USERNAME'] = 'user_name'
#app.config['MAIL_PASSWORD'] = 'password'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

CORS(app)
cors = CORS(app,resources={
    r"/*":{
        "origins": "*"
    }
})
print("yes")
data = ""
@app.route("/",methods=['POST'])
def home():
    global data
    json.dump(request.json,open("input.json","w"),indent=4,sort_keys=True)
    data = request.json
    return "Hi from Flask"

@app.route("/msg",methods=['POST'])
def getMsg():
    datas = request.get_json()
    msg = datas["msg"]
    print(msg)
    searchbox.send_keys(msg)
    searchbox.send_keys(Keys.ENTER)
    global data
    db = sqlite3.connect("database.db")
    cur=db.cursor()
    while True:
        if("queryResult" in data and data["queryResult"]["queryText"]==msg):
            if("intent" in data["queryResult"] and data["queryResult"]["intent"]["displayName"] == "Default Fallback Intent"):
                email= data["queryResult"]["outputContexts"][0]["parameters"]["email"]
                question = msg
                putquestion(question,email,cur,db)
            return data["queryResult"]["fulfillmentText"]
@app.route("/questions")
def getQuestions():
    db=sqlite3.connect("database.db")
    cur=db.cursor()
    cur.execute("select question from questions")
    res = cur.fetchall()
    result = {"questions":[]}
    for i in res:
      result["questions"].append(i[0])
    return result
@app.route("/faqs")
def getFaqs():
    db=sqlite3.connect("database.db")
    cur=db.cursor()
    cur.execute("select * from frequently")
    res = cur.fetchall()
    result = {"questions":[]}
    for i in res:
        d={}
        d["index"]=i[0]
        d["question"]=i[1]
        d["answer"]=i[2]
        result["questions"].append(d)
    return result
def sendmail(question,answer,email):
    msg = Message(
        'answer to your question from VVIT',
        sender='telugutechmixer@gmail.com',
        recipients= [email[0]]
    )
    msg.body = '''
    your question:
    Q)'''+question+'''
    Ans)'''+answer+'''
    
    we hope that this answers your question if have any other feel free to visit our faqs page or ask them to our bot
    regards,
    bot'''
    mail.send(msg)

@app.route("/putquestion",methods=['POST'])
def putquestions():
    data = request.get_json()
    question = data["question"]
    answer = data["answer"]
    db=sqlite3.connect("database.db")
    cur=db.cursor()
    cur.execute("insert into fquestions(question,answer) values(?,?)",[question,answer])
    db.commit()
    cur.execute("select email from questions where question = ?",[question])
    email = cur.fetchall()[0]
    sendmail(question,answer,email)
    cur.execute("delete from questions where question = ?",[question])
    db.commit()
    cur.execute("select question from questions")
    res = cur.fetchall()
    result = {"questions":[]}
    idex= getIndex()
    cur.execute("select * from fquestions")
    total=len(cur.fetchall())
    if(total-idex>=5):
        document_upload(cur)
    for i in res:
      result["questions"].append(i[0])
    return result
@app.route("/delquestion",methods=['POST'])
def delquestions():
    data = request.get_json()
    print(data)
    question = data["que"]
    db=sqlite3.connect("database.db")
    cur=db.cursor()
    cur.execute("delete from questions where question = ?",[question])
    db.commit()
    cur.execute("select question from questions")
    res = cur.fetchall()
    result = {"questions":[]}
    for i in res:
      result["questions"].append(i[0])
    return result
    
app.run(port=8080)
