"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        bio: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    User.beforeCreate(function (user, options) {
        return bcrypt.hash(user.password, 10)
            .then(function (hash) {
            user.password = hash;
        })
            .catch(function (err) { throw new Error(); });
    });
    return User;
};
