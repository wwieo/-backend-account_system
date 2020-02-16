const sequelize = require('sequelize');
const config = require("../configs/config.js");

const model = new sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: config.pool,
    timestamps: false,
    freezeTableName: true,
    logging: false
});


registeration = require("./registeration.js")(model, sequelize.DataTypes);
model["registeration"] = registeration;
registeration.sync();


module.exports = model;