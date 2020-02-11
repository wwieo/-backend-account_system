module.exports = function(sequelize, DataTypes) {
    return sequelize.define('registeration', {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
};