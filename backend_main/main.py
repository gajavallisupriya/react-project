from pydoc import doc
from google_auth_oauthlib import flow
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import schedule
import time
import os.path
import json
import requests
from encoding import getdata

def authentication():
    SCOPES = ['https://www.googleapis.com/auth/dialogflow']
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'keys.json', SCOPES)
            creds = flow.run_local_server(port=0)
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
def document_upload(cur):
    authentication()
    print("document uploaded")
    f = open('token.json')
    data =  json.load(f)
    encoded_string=getdata(cur)
    if(encoded_string !=None):
        header={"Content-Type": "application/json","Accept": "application/json","Authorization": "Bearer "+data["token"]}
        json_data={ "displayName": "document3","mimeType": "text/csv","knowledgeTypes": "FAQ","rawContent":encoded_string}
        ans={"name": "projects/example1-gyvt/knowledgeBases/MTA4MjQyNTc2NjgzNjE3NDg0ODA","displayName": "Sample","languageCode": "en-US"}
        response=requests.post("https://dialogflow.googleapis.com/v2beta1/projects/example1-gyvt/knowledgeBases/MTI3NjA4MDU1MDgxMzEwNjE3NjA/documents",headers=header,json=json_data)
    #return response.json()


authentication()
