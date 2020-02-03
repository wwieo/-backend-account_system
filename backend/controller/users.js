const {
    create,
    updateUser,
    getUsers,
    getUserByEmail,
    getUserById,
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

        //username len>3
        //password len>5   
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
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return return_rt(res, 0, "Something gets error");
            }
            return return_rt(res, 1, results);
        });
    },
    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results)
                return return_rt(res, 0, "No user record");
            return return_rt(res, 1, results);
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