const { getUserByEmail, getUserByUserName } = require("../../database/users");

const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


function check(body, err, results, res) {
    if (err) {
        console.log(err);
    }
    if (!results) {
        return res.json({
            success: 0,
            message: "invalid email, username or password"
        });
    }
    const result = compareSync(body.password, results.password);
    if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
            expiresIn: "1h"
        });
        return res.json({
            success: 1,
            message: "login successfully",
            token: jsontoken
        });
    } else {
        return res.json({
            success: 0,
            message: "invalid email, username or password"
        });
    }
}

module.exports = {
    login: (req, res) => {
        let body = req.body;
        if (body.email != undefined) {
            getUserByEmail(body.email, (err, results) => {
                check(body, err, results, res);
            });
        } else {
            getUserByUserName(body.user_name, (err, results) => {
                check(body, err, results, res);
            });
        }
    }
}