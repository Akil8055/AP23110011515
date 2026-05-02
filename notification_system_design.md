# Stage 1 :
## core actions:
fetch notification for a user 
creaate notification
mark notification as read
delete notification
## API Endpoints
### 1.get notifications
=get/notifications?userId=17484

response :

data ={ "notifications": [ 
    { "id": "1", 
    "type": "event", 
    "message": "Tech Fest", 
    "isRead": false, 
    "timestamp": "2026-04-22T17:51:30Z" } ] }

### 2.create notification
=post/notifications

Request Body:

{
  "userId": "123",
  "type": "placement",
  "message": "You are shortlisted"
}

Response:

{
  "id": "101",
  "status": "created"
}

### 3.marks a read
= patch/notification//read
Response:

{
  "status": "updated"
}
### 4.delete notification
= delete/notification
Response:

{
  "status": "deleted"
}

Each notification contains:

id (string)
userId (string)
type (event | result | placement)
message (string)
isRead (boolean)
timestamp (ISO string)
## Real-Time Notification Mechanism
websockets to send real time notification

# Stage 2:

## database choice 
i would recommend using a relational database(postgre SQL) because:
structured schema
efficient querying using indexes

## database Schema 
column      - type     
id          - UUid  
userid      - varchar
type        - Enum 
message     - text
isread      - boolean
createdat   - timestamp

## problem as data grows

slow queries
increased latency

## sample queries
select * FROM notifications WHERE userid = 'Akil' ORDER BY createdAt DESC LIMIT 20;
delete from notifications where id = 'notification_id';
