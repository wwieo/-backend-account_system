require("dotenv").config();
const express = require("express");
const app = express();
var cors = require('cors')
const userRouter = require("./api/users/user_router");


app.use(express.json());
app.use(cors());

app.use("/api/users", userRouter);

app.listen(process.env.APP_PORT, () => {
    console.log("server running, PORT:", process.env.APP_PORT);
});