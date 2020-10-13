# Backend Account System

**Notice: The current version is on branch dev now.**

* With using restfulAPI, you can reach the functions as like:
    * Account system: register/login/update/find
    * Friend system: friend/check/block/unfriend/unblock
  
## To do list

#### 1) Add .env file, which needs to communicate with MYSQL

* .env file includes:
    * DB_PORT= (MYSQL port you set)
    * DB_HOST= (MYSQL host you set)
    * DB_USER= (MYSQL user)
    * DB_PASS= (MYSQL password)
    * APP_PORT= (this project's port you want to set)


#### 2) Something should be install

* Create 2 databases in your MYSQL manually:
    * systemPractice: the main database this project runs.
    * systemPracticeTest: the test database this project runs with unit test.
  
Finally install the npm package:
```
npm i
```
  
Then you can run this project by the command below:
```
node app.js
```
  
## API List

Now you can use account and friend system api:  
We will use localhost(your_host) and 3000(your_port) to represent our example.  
Your request should package for a json format if needed.  

### Account system
**URL = localhost:3000/api/users**  
User includes id, user_name, name, email and password.  
* Get all users' data
    * [GET] URL/
* Get a user's data by user_name
    * [GET] URL/:user_name
* Check a user if exists by user_name
    * [GET] URL/exist_user_name/:user_name
* Check a user if exists by email
    * [GET] URL/exist_email/:email
* Create a user
    * [POST] URL/
    * Json includes user_name, name, email and password.
* Login
    * [POST] URL/login
    * Json includes user_name or email, and password.
    * Result will return a token if success login.
* Update a user data
    * [PUT] URL/
    * Need a token to update.
    * Json only includes values which need to be update.
    * Only can update email and name.
* Update a user's password
    * [PUT] URL/pw
    * Need a token to update.
    * Json includes old_password, new_password and user_name.

### Friend system
**URL = localhost:3000/api/relationship**  
User relationship includes sender_id, receiver_id and status.  
Friend system is still in developing, so there's no need token to send.
* Get a user's all friends
    * [GET] URL/userFriends
    * Json includes user_id
* Check 2 user's relationship
    * [GET] URL/check
    * Json includes user1_id and user2_id
* Send a friend request
    * [POST] URL/friendRequest
    * Json includes sender_id and receiver_id
* Reply a friend request
    * [PUT] URL/replyFriend
    * Json includes sender_id(friend request sender) and receiver_id
* Block a user
    * [PUT] URL/block
    * Json includes sender_id(block request sender) and receiver_id
* Unfriend a user
    * [DELETE] URL/unfriend
    * Json includes user1_id and user2_id
* Unblock a user
    * [DELETE] URL/unblock
    * Json includes sender_id(block request sender) and receiver_id

If you want to run a unit test, run the command:  
It will show you the whole test and test coverage.
```
npm run test
```
Note: There is only acoount system test from now on.