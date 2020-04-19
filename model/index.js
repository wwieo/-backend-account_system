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
user_relationship = require("./user_relationship.js")(model, sequelize.DataTypes);

model["registeration"] = registeration;
model["user_relationship"] = user_relationship;

registeration.hasMany(user_relationship, { foreignKey: "id" });

user_relationship.belongsTo(registeration, { foreignKey: 'sender_id' });
user_relationship.belongsTo(registeration, { foreignKey: 'receiver_id' });

registeration.sync();
user_relationship.sync();

module.exports = model;