const pool = require("../../config/database");

module.exports = {
    create: (data, callback) => {
        pool.query(
            'insert into registeration(name, user_name, email, password)\
            values(?,?,?,?)', [
                data.name,
                data.user_name,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
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
                return callback(null, results[0]);
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
    }
};