import base64
import csv
from io import StringIO
from databaseOp import fetchdata
def getdata(cur):
    test_data = fetchdata(cur)
    if(len(test_data)>0):
        f = StringIO()
        csv.writer(f).writerows(test_data)
        ans=base64.b64encode(f.getvalue().encode())
        return str(ans)[2:-1]
    else:
        return None
#print(getdata())