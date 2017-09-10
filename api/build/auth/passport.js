"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../models/user");
var passport_jwt_1 = require("passport-jwt");
var passport_jwt_2 = require("passport-jwt");
var passport_local_1 = require("passport-local");
var localOptions = {
    usernameField: 'email'
};
var localLogin = new passport_local_1.Strategy(localOptions, function (email, password, done) {
    user_1.User.findOne({ email: email }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: 'Your login details could not be verified. Please try again.' });
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, { message: 'Your login details could not be verified. Please try again.' });
            }
            return done(null, user);
        });
    });
});
exports.localLogin = localLogin;
var jwtOptions = {
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret',
    session: false
};
var jwtLogin = new passport_jwt_1.Strategy(jwtOptions, function (payload, done) {
    user_1.User.findById(payload._id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    });
});
exports.jwtLogin = jwtLogin;
