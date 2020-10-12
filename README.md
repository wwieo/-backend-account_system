# Backend Account System

With using restfulAPI, you can reach the function as like:
Account system: register/login/update data with token
Friend system: friend/check/block/unfriend

## To do list

#### 1) Add .env file, which needs communicate with MYSQL

* .env file includes:
    * DB_PORT= (database port you want to set)
    * DB_HOST= (database host you want to set)
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

