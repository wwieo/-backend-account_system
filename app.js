require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')

const userRouter = require("./api/router/users");
const userRelationshipRouter = require("./api/router/user_relationship");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/relationship", userRelationshipRouter);

app.listen(process.env.APP_PORT, () => {
    if (!(typeof global.it === 'function')) console.log("server running, PORT:", process.env.APP_PORT);
});

module.exports = app;