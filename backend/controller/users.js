const {
    create,
    updateUser,
    getUsers,
    getUserByEmail,
    getUserByUserName
} = require("../database/users");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { return_rt } = require("./../controller/return_rt")
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: async function(req, res) {
        const body = req.body;
        const salt = genSaltSync(10);
        if (body.name == undefined || body.user_name == undefined ||
            body.email == undefined || body.password == undefined)
            return return_rt(res, 0, "some inputs are none");

        if (body.user_name.length <= 3) return return_rt(res, 0, "user_name's length need be more than 3");
        if (body.password.length <= 5) return return_rt(res, 0, "password's length need be more than 5");

        body.password = hashSync(body.password, salt);

        const userName = await getUserByUserName(body.user_name);
        const userEmail = await getUserByEmail(body.email);
        if (userName) return return_rt(res, 0, "someone has registered this user_name");
        if (userEmail) return return_rt(res, 0, "someone has registered this email");

        await create(body)
            .then((body) => {
                return return_rt(res, 1, body);
            })
            .catch((body) => {
                console.log(body);
                return return_rt(res, 0, "Database connection error");
            });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results)
                return return_rt(res, 0, "Updated failed");
            return return_rt(res, 1, "Updated successfully");
        });
    },
    getUsers: (req, res) => {
        getUsers()
            .then((results) => {
                return return_rt(res, 1, results);
            })
            .catch((results) => {
                console.log(results);
                return return_rt(res, 0, "Database connection error");
            });
    },
    getUserByUserName: (req, res) => {
        const user_name = req.params.user_name;
        getUserByUserName(user_name)
            .then((results) => {
                if (results) return return_rt(res, 1, results);
                else return return_rt(res, 0, "No user record");
            })
            .catch((results) => {
                console.log(results);
                return return_rt(res, 0, "getUserByUserName api error");
            })
    },
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

function check(body, err, results, res) {
    if (err)
        console.log(err);
    if (!results)
        return return_rt(res, 0, "invalid email, username or password");

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
    } else
        return return_rt(res, 0, "invalid email, username or password");

}