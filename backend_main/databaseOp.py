import sqlite3
db = sqlite3.connect("database.db")
indx=16
def getIndex():
    return indx
def fetchdata(cur):
    global indx
    #cur = db.cursor()
    cur.execute("SELECT * FROM fquestions")
    res = cur.fetchall()
    output=[]
    for j in range(len(res)):
        if res[j][0]>=indx:
            output.append([res[j][1],res[j][2]])
            indx = max(indx,res[j][0])
    indx = indx+1
    print(indx)
    return output
def putquestion(question,email,cur,db1):
    print(cur,question,email[0])
    cur.execute("insert into questions(question,email) values(?,?)",[str(question),str(email[0])])
    db1.commit()
def ansquestion(question,answer):
    cur=db.cursor()
    cur.execute("insert into fquestions(question,answer) values(?,?)",[question,answer])
    cur.execute("delete from questions where question = ? ",[question])
    db.commit()



