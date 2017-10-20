"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var roles_1 = require("../constants/roles");
var utils_1 = require("../utils");
var filter = require("express-validator/filter");
var utils_2 = require("../utils");
var errors_1 = require("../constants/errors");
var userRepo_1 = require("../repositories/userRepo");
var roleRepo_1 = require("../repositories/roleRepo");
var register = utils_2.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data, user, createdUser, userModel, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = utils_1.getErrors(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ errors: errors.mapped() })];
                }
                data = filter.matchedData(req);
                return [4 /*yield*/, userRepo_1.findUserByEmail(data.email)];
            case 1:
                user = _a.sent();
                if (user) {
                    return [2 /*return*/, res.status(422).json(utils_1.formatError(errors_1.EMAIL_ALREADY_IN_USE))];
                }
                return [4 /*yield*/, userRepo_1.createUser(data)];
            case 2:
                createdUser = _a.sent();
                userModel = createdUser.get({ plain: true });
                return [4 /*yield*/, roleRepo_1.associateRole(userModel.id, utils_2.getRoleId(roles_1.USER_ROLE))];
            case 3:
                _a.sent();
                userInfo = {
                    id: userModel.id,
                    first_name: userModel.first_name,
                    last_name: userModel.last_name,
                    email: userModel.email,
                    roles: [roles_1.USER_ROLE]
                };
                res.status(201).json({
                    token: "JWT " + utils_2.generateToken(userInfo),
                    user: userInfo
                });
                return [2 /*return*/];
        }
    });
}); });
exports.register = register;
var login = utils_2.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var userInfo;
    return __generator(this, function (_a) {
        userInfo = {
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            roles: [roles_1.USER_ROLE]
        };
        res.status(200).json({
            token: "JWT " + utils_2.generateToken(userInfo),
            user: userInfo
        });
        return [2 /*return*/];
    });
}); });
exports.login = login;
// import * as JWT from 'jsonwebtoken';
// import * as crypto from 'crypto';
// // import {User} from '../models/user';
// import {setUserInfo,getRole, env} from '../utils';
// import * as passport from 'passport';
// import {localLogin,jwtLogin} from '../auth/passport';
// import {Strategy as LocalStrategy} from 'passport-local';
// // passport.use(jwtLogin);
// // passport.use(localLogin);
// // const requireLogin = passport.authenticate('local', { session: false });
// function login  (req, res, next) {
//   const userInfo = setUserInfo(req.user);
//   res.status(200).json({
//     token: `JWT ${generateToken(userInfo)}`,
//     user: userInfo
//   });
// };
// function register(req, res, next) {
//   // Check for registration errors
//   const email = req.body.email;
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const password = req.body.password;
//   // Return error if no email provided
//   if (!email) {
//     return res.status(422).send({ error: 'You must enter an email address.' });
//   }
//   // Return error if full name not provided
//   if (!firstName || !lastName) {
//     return res.status(422).send({ error: 'You must enter your full name.' });
//   }
//   // Return error if no password provided
//   if (!password) {
//     return res.status(422).send({ error: 'You must enter a password.' });
//   }
//   User.findOne({ email }, (err, existingUser) => {
//     if (err) { return next(err); }
//       // If user is not unique, return error
//     if (existingUser) {
//       return res.status(422).send({ error: 'That email address is already in use.' });
//     }
//       // If email is unique and password was provided, create account
//     const user = new User({
//       email,
//       password,
//       profile: { firstName, lastName }
//     });
//     user.save((err, user) => {
//       if (err) { return next(err); }
//       const userInfo = setUserInfo(user);
//       res.status(201).json({
//         token: `JWT ${generateToken(userInfo)}`,
//         user: userInfo
//       });
//     });
//   });
// };
// function roleAuthorization (requiredRole) {
//   return function (req, res, next) {
//     const user = req.user;
//     User.findById(user._id, (err, foundUser: any) => {
//       if (err) {
//         res.status(422).json({ error: 'No user was found.' });
//         return next(err);
//       }
//       // If user is found, check role.
//       if (getRole(foundUser.role) >= getRole(requiredRole)) {
//         return next();
//       }
//       return res.status(401).json({ error: 'You are not authorized to view this content.' });
//     });
//   };
// };
// function forgotPassword(req, res, next) {
//   const email = req.body.email;
//   User.findOne({ email }, (err, existingUser: any) => {
//     // If user is not found, return error
//     if (err || existingUser == null) {
//       res.status(422).json({ error: 'Your request could not be processed as entered. Please try again.' });
//       return next(err);
//     }
//       // If user is found, generate and save resetToken
//       // Generate a token with Crypto
//     crypto.randomBytes(48, (err, buffer) => {
//       const resetToken = buffer.toString('hex');
//       if (err) { return next(err); }
//       existingUser.resetPasswordToken = resetToken;
//       existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour
//       existingUser.save((err) => {
//           // If error in saving token, return it
//         if (err) { return next(err); }
//         const message = {
//           subject: 'Reset Password',
//           text: `${'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//             'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//             'http://'}${req.headers.host}/reset-password/${resetToken}\n\n` +
//             `If you did not request this, please ignore this email and your password will remain unchanged.\n`
//         };
//         return res.status(200).json({ message: 'Please check your email for the link to reset your password.' });
//       });
//     });
//   });
// };
// function verifyToken(req, res, next) {
//   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser :any) => {
//     // If query returned no results, token expired or was invalid. Return error.
//     if (!resetUser) {
//       res.status(422).json({ error: 'Your token has expired. Please attempt to reset your password again.' });
//     }
//     // Otherwise, save new password and clear resetToken from database
//     resetUser.password = req.body.password;
//     resetUser.resetPasswordToken = undefined;
//     resetUser.resetPasswordExpires = undefined;
//     resetUser.save((err) => {
//       if (err) { return next(err); }
//         // If password change saved successfully, alert user via email
//       const message = {
//         subject: 'Password Changed',
//         text: 'You are receiving this email because you changed your password. \n\n' +
//           'If you did not request this change, please contact us immediately.'
//       };
//         // Otherwise, send user email confirmation of password change via Mailgun
//       return res.status(200).json({ message: 'Password changed successfully. Please login with your new password.' });
//     });
//   });
// };
// function meFromToken(req,res,next){
//   let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
//   if (!token) {
//     return res.status(401).json({
//       message: 'Unauthorized'
//     });
//   }
//   token = token.replace('Bearer ', '');
//   JWT.verify(token, env('JWT_SECRET'), (err, user) => {
//     if(err) throw err.message;
//     User.findById({
//       '_id': user._id
//     }, function(err, user) {
//       if (err) throw err;
//       const userInfo = setUserInfo(user);
//       res.status(201).json({
//         token: `JWT ${generateToken(userInfo)}`,
//         user: userInfo
//       });
//     });
//   });
// }
// export {
//   login,
//   register,
//   forgotPassword,
//   verifyToken,
//   roleAuthorization,
//   meFromToken
// }; 
//# sourceMappingURL=AuthController.js.map