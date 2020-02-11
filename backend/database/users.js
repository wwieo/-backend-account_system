const pool = require("../../model/index.js");

const create = data => {
    return new Promise((resolve, reject) => {
        pool.query(
            'insert into registeration(name, user_name, email, password)\
            values(?,?,?,?)', [
                data.name,
                data.user_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results);
            }
        );
    })
}

const getUserByUserName = user_name => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select * from registeration where user_name=?', [user_name],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results[0]);
            }
        );
    })
}

const getUserByEmail = email => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select * from registeration where email=?', [email],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results[0]);
            }
        );
    })
}

const getUsers = () => {
    return new Promise((resolve, reject) => {
        pool.query(
            'select id, name, user_name, email from registeration', [],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results);
            }
        );
    })
}

const updateUser = data => {
    return new Promise((resolve, reject) => {
        pool.query(
            'update registeration set name=?, email=? where user_name=?', [data.name,
                data.email,
                data.user_name
            ],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results);
            }
        );
    })
}

const updateUserPassword = data => {
    return new Promise((resolve, reject) => {
        pool.query(
            'update registeration set password=? where user_name=?', [data.new_password,
                data.user_name
            ],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results);
            }
        );
    })
}

const deleteUserById = id => {
    return new Promise((resolve, reject) => {
        pool.query(
            'delete from registeration where id=?', [data.id],
            (error, results, fields) => {
                if (error) return reject(error);
                else return resolve(results);
            }
        );
    })
}

module.exports = {
    create,
    getUserByUserName,
    getUserByEmail,
    getUsers,
    updateUser,
    updateUserPassword,
    deleteUserById
};