"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JWT = require("jsonwebtoken");
var crypto = require("crypto");
var user_1 = require("../models/user");
var utils_1 = require("../utils");
var passport = require("passport");
var passport_1 = require("../auth/passport");
passport.use(passport_1.jwtLogin);
passport.use(passport_1.localLogin);
var requireLogin = passport.authenticate('local', { session: false });
exports.requireLogin = requireLogin;
function generateToken(user) {
    return JWT.sign(user, process.env.JWT_SECRET || '', {
        expiresIn: 604800 // in seconds
    });
}
function login(req, res, next) {
    var userInfo = utils_1.setUserInfo(req.user);
    res.status(200).json({
        token: "JWT " + generateToken(userInfo),
        user: userInfo
    });
}
exports.login = login;
;
function register(req, res, next) {
    // Check for registration errors
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var password = req.body.password;
    // Return error if no email provided
    if (!email) {
        return res.status(422).send({ error: 'You must enter an email address.' });
    }
    // Return error if full name not provided
    if (!firstName || !lastName) {
        return res.status(422).send({ error: 'You must enter your full name.' });
    }
    // Return error if no password provided
    if (!password) {
        return res.status(422).send({ error: 'You must enter a password.' });
    }
    user_1.User.findOne({ email: email }, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        // If user is not unique, return error
        if (existingUser) {
            return res.status(422).send({ error: 'That email address is already in use.' });
        }
        // If email is unique and password was provided, create account
        var user = new user_1.User({
            email: email,
            password: password,
            profile: { firstName: firstName, lastName: lastName }
        });
        user.save(function (err, user) {
            console.log('before err');
            if (err) {
                return next(err);
            }
            var userInfo = utils_1.setUserInfo(user);
            console.log('info', userInfo);
            res.status(201).json({
                token: "JWT " + generateToken(userInfo),
                user: userInfo
            });
        });
    });
}
exports.register = register;
;
function roleAuthorization(requiredRole) {
    return function (req, res, next) {
        var user = req.user;
        user_1.User.findById(user._id, function (err, foundUser) {
            if (err) {
                res.status(422).json({ error: 'No user was found.' });
                return next(err);
            }
            // If user is found, check role.
            if (utils_1.getRole(foundUser.role) >= utils_1.getRole(requiredRole)) {
                return next();
            }
            return res.status(401).json({ error: 'You are not authorized to view this content.' });
        });
    };
}
exports.roleAuthorization = roleAuthorization;
;
function forgotPassword(req, res, next) {
    var email = req.body.email;
    user_1.User.findOne({ email: email }, function (err, existingUser) {
        // If user is not found, return error
        if (err || existingUser == null) {
            res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
            return next(err);
        }
        // If user is found, generate and save resetToken
        // Generate a token with Crypto
        crypto.randomBytes(48, function (err, buffer) {
            var resetToken = buffer.toString('hex');
            if (err) {
                return next(err);
            }
            existingUser.resetPasswordToken = resetToken;
            existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            existingUser.save(function (err) {
                // If error in saving token, return it
                if (err) {
                    return next(err);
                }
                var message = {
                    subject: 'Reset Password',
                    text: "" + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + "/reset-password/" + resetToken + "\n\n" +
                        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
                };
                return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
            });
        });
    });
}
exports.forgotPassword = forgotPassword;
;
function verifyToken(req, res, next) {
    user_1.User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, resetUser) {
        // If query returned no results, token expired or was invalid. Return error.
        if (!resetUser) {
            res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
        }
        // Otherwise, save new password and clear resetToken from database
        resetUser.password = req.body.password;
        resetUser.resetPasswordToken = undefined;
        resetUser.resetPasswordExpires = undefined;
        resetUser.save(function (err) {
            if (err) {
                return next(err);
            }
            // If password change saved successfully, alert user via email
            var message = {
                subject: 'Password Changed',
                text: 'You are receiving this email because you changed your password. \n\n' +
                    'If you did not request this change, please contact us immediately.'
            };
            // Otherwise, send user email confirmation of password change via Mailgun
            return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
        });
    });
}
exports.verifyToken = verifyToken;
;
