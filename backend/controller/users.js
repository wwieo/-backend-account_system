const {
    create,
    updateUser,
    updateUserPassword,
    getUsers,
    getUserByEmail,
    getUserByUserName,
    getUserById
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

        const CheckLength = checkLength(res, body);
        if (CheckLength) return CheckLength;

        body.password = hashSync(body.password, salt);

        const userName = await getUserByUserName(body.user_name);
        const userEmail = await getUserByEmail(body.email);
        if (userName) return return_rt(res, 0, "someone has registered this user_name");
        if (userEmail) return return_rt(res, 0, "someone has registered this email");
        await create(body)
            .then((body) => {
                return return_rt(res, 1, {
                    "email": body.email,
                    "name": body.name,
                    "user_name": body.user_name,
                });
            })
            .catch((body) => {
                console.log(body);
                return return_rt(res, 0, "Database connection error");
            });
    },
    updateUser: async function(req, res) {
        const body = req.body;

        if (body.user_name == undefined) return return_rt(res, 0, "Need to input user_name");

        const userName = await getUserByUserName(body.user_name);
        if (!userName) return return_rt(res, 0, "No user record");
        if (body.name == undefined) body.name = userName.name;
        if (body.email == undefined) body.email = userName.email;

        const userEmail = await getUserByEmail(body.email);
        if (userEmail) return return_rt(res, 0, "Someone has registered this email");

        const CheckLength = checkLength(res, body);
        if (CheckLength) return CheckLength;

        await updateUser(body)
            .then(() => {
                return return_rt(res, 1, "Updated successfully");
            })
            .catch((results) => {
                console.log(results);
                return return_rt(res, 0, "Updated failed");
            });
    },
    updateUserPassword: async function(req, res) {
        const body = req.body;
        const salt = genSaltSync(10);

        if (body.old_password == undefined ||
            body.new_password == undefined ||
            body.user_name == undefined)
            return return_rt(res, 0, "Some inputs are none");
        const userName = await getUserByUserName(body.user_name);
        const userId = await getUserById(userName.id);
        const result = await compareSync(body.old_password, userId.password);
        if (!result) return return_rt(res, 0, "Old password is different");
        else {
            if (body.new_password.length <= 5 || body.new_password == "") return return_rt(res, 0, "new_password's length need be more than 5");
            body.new_password = hashSync(body.new_password, salt);
            await updateUserPassword(body)
                .then(() => {
                    return return_rt(res, 1, "Updated password successfully");
                })
                .catch((results) => {
                    console.log(results);
                    return return_rt(res, 0, "Updated password failed");
                });
        }
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
    login: async function(req, res) {
        let body = req.body;
        let login = undefined;
        if (body.user_name != undefined) login = await getUserByUserName(body.user_name);
        if (!login && body.email != undefined) login = await getUserByEmail(body.email);
        if (!login) return return_rt(res, 0, "user_name and email are none or no user record");
        if (body.password == undefined || body.password == "") return return_rt(res, 0, "Password input is none");

        const userId = await getUserById(login.id);
        const result = compareSync(body.password, userId.password);
        if (!result) return return_rt(res, 0, "invalid password");
        else {
            userId.password = undefined;
            const jsontoken = sign({ result: userId }, "qwe1234", {
                expiresIn: "1h"
            });
            return res.json({
                success: 1,
                message: "login successfully",
                user_name: login.user_name,
                name: login.name,
                email: login.email,
                token: jsontoken
            });
        }
    }
}

function checkLength(res, body) {
    if (body.name || body.name == "") {
        if (body.name.length < 1 || body.name == "") return return_rt(res, 0, "user_name's length need be more than 0");
        else if (body.name.length > 12) return return_rt(res, 0, "user_name's length need be less than 12");
    }
    if (body.user_name || body.user_name == "") {
        if (body.user_name.length <= 3 || body.user_name == "") return return_rt(res, 0, "user_name's length need be more than 3");
        else if (body.user_name.length > 12) return return_rt(res, 0, "user_name's length need be less than 12");
    }
    if (body.password || body.password == "") {
        if (body.password.length <= 5 || body.password == "") return return_rt(res, 0, "password's length need be more than 5");
        else if (body.password.length > 12) return return_rt(res, 0, "password's length need be less than 12");
    }
    return 0;
}