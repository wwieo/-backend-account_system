const pool = require("../../model/index.js");

const create = data => {
    return new Promise((resolve, reject) => {
        pool.registeration.create({
            name: data.name,
            user_name: data.user_name,
            email: data.email,
            password: data.password
        }, {
            attributes: [
                "id",
                "name",
                "user_name",
                "email"
            ]
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    })
}

const getUserByUserName = user_name => {
    return new Promise((resolve, reject) => {
        pool.registeration.findOne({
            where: {
                user_name: user_name
            },
            attributes: [
                "id",
                "name",
                "user_name",
                "email"
            ]
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    });
}

const getUserByEmail = email => {
    return new Promise((resolve, reject) => {
        pool.registeration.findOne({
            where: {
                email: email
            },
            attributes: [
                "id",
                "name",
                "user_name",
                "email"
            ]
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    });
}

const getUserById = id => {
    return new Promise((resolve, reject) => {
        pool.registeration.findOne({
            where: {
                id: id
            }
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    });
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.registeration.findAll({
                attributes: [
                    "id",
                    "name",
                    "user_name",
                    "email"
                ]
            })
            .then((users) => {
                return resolve(users);
            }).catch((error) => {
                return reject(error);
            });
    });
}

const updateUser = data => {
    return new Promise((resolve, reject) => {
        pool.registeration.update({
            name: data.name,
            email: data.email
        }, {
            where: {
                user_name: data.user_name
            }
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    })
}

const updateUserPassword = data => {
    return new Promise((resolve, reject) => {
        pool.registeration.update({
            password: data.new_password
        }, {
            where: {
                user_name: data.user_name
            }
        }).then((user) => {
            return resolve(user);
        }).catch((error) => {
            return reject(error);
        });
    })
}

module.exports = {
    create,
    getUserByUserName,
    getUserByEmail,
    getUserById,
    getUsers,
    updateUser,
    updateUserPassword
};