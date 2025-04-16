const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/db')

class Account extends Model { }

Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'mod', 'admin']]
        }
    },
    isExpert: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    timestamps: true,
    modelName: 'Account',
    tableName: 'accounts'
});

Account.hasMany(Post, { foreignKey: 'accountId' });
Account.hasMany(Comment, { foreignKey: 'accountId' });
Account.hasMany(Like, { foreignKey: 'accountId' });
Account.hasMany(Notification, { foreignKey: 'accountId' });
Account.hasMany(Report, { foreignKey: 'accountId' });
Account.hasMany(Product, { foreignKey: 'accountId' });
Account.hasMany(Order, { foreignKey: 'accountId' });

module.exports = Account;
