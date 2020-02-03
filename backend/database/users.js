const pool = require("./../db_set");

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
            'select * from registeration where user_name=?', user_name,
            (error, results, fields) => {
                if (error) return reject(error);
                else resolve(results[0]);
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

module.exports = {
    create,
    getUserByUserName,
    getUserByEmail,
    getUsers: callback => {
        pool.query(
            'select id, name, user_name, email from registeration', [],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(
            'select id, name, user_name, email from registeration where id=?', [id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            'update registeration set name=?, user_name=?, email=?, password=? where id=?', [data.name,
                data.user_name,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            'delete from registeration where id=?', [data.id],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

};