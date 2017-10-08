"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcrypt");
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: DataTypes.STRING,
        password: DataTypes.STRING
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
