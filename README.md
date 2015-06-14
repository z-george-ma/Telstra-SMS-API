
# Telstra-SMS-API
NodeJS API for Telstra SMS

Telstra has recently released its [SMS API](https://dev.telstra.com/content/sms-api-0). This is a NodeJS wrapper to take care of authentication and callbacks. 

To start
```
npm install
TKEY=[TELSTRA_DEV_KEY] TSECRET=[TELSTRA_DEV_SECRET] S3BUCKET=[BUCKET_FOR_CALLBACK] node server
```

###API Definition:

####Send SMS

**Request:**
```
POST /sms/0412345678
Content-Type: text/plain
Hello world!
```

**Response**
```
{  
   "messageId":"CBCB3DCC991D8AF0"
}
```

####Get message status

**Request:**
```
GET /messages/CBCB3DCC991D8AF0
```

**Response**
```
{  
   "to":"XXXXXX",
   "receivedTimestamp":"2015-02-05T14:10:14+11:00",
   "sentTimestamp":"2015-02-05T14:10:12+11:00",
   "status":"DELIVRD"
}
```

####Get message reply

**Request:**
```
GET /messages/CBCB3DCC991D8AF0/response
```

**Response:**
```
[  
   {  
      "from":"XXXXXXX",
      "acknowledgedTimestamp":"05/02/15 14:17",
      "content":"Hello, Telstra"
   }
]
```
####Telstra Callback
Any callback from Telstra will be saved as a S3 file with key of [message_id]/[timestamp].


####HTTP Status code:
```
200 OK
500 Internal Server Error
```
