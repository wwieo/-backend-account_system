module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user_relationship", {
        sender_id: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        receiver_id: {
            type: DataTypes.INTEGER(),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};