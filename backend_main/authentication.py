from re import A
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
driver = webdriver.Chrome()
'''options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])
driver = webdriver.Chrome(options=options)'''
driver.get("https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/dialogflow&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost&client_id=107677393209-h88i0gq67rnb83m2fudvcb6ms4d0dr4p.apps.googleusercontent.com")
signin = driver.find_element_by_xpath('//*[@id="identifierId"]')
signin.send_keys("supriya6168@gmail.com")
button = driver.find_element_by_xpath('//*[@id="identifierNext"]/div/button')
button.click()