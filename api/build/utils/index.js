"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roles_1 = require("../constants/roles");
var user_1 = require("../models/user");
function resolvePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return 3000;
}
exports.resolvePort = resolvePort;
exports.setUserInfo = function (request) {
    var getUserInfo = {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    };
    return getUserInfo;
};
exports.getRole = function (checkRole) {
    var role;
    switch (checkRole) {
        case roles_1.ROLE_SUPERADMIN:
            role = 4;
            break;
        case roles_1.ROLE_ADMIN:
            role = 3;
            break;
        case roles_1.ROLE_PROFESSIONAL:
            role = 2;
            break;
        case roles_1.ROLE_USER:
            role = 1;
            break;
        default: role = 1;
    }
    return role;
};
function isAuthorized(role) {
    return function (req, res, next) {
        var user = req.user;
        user_1.User.findById(user._id, function (err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user found' });
                return next(err);
            }
            if (exports.getRole(foundUser.role) >= exports.getRole(role)) {
                return next();
            }
            res.status(401).json({ error: "You are not authorized to see the content" });
            return next(err);
        });
    };
}
exports.isAuthorized = isAuthorized;
function env(key) {
    var myVal = process.env[key];
    if (myVal === undefined) {
        throw new Error("No ENV " + key + " not found");
    }
    return myVal;
}
exports.env = env;
