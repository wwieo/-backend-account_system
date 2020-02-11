const sequelize = require('sequelize');
const config = require("../configs/config.js");

const model = new sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool
});

registeration = require("./registeration.js")(model, sequelize.DataTypes);
registeration.sync();


module.exports = model;