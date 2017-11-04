"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var errors_1 = require("../constants/errors");
var messages_1 = require("../constants/messages");
var roles_1 = require("../constants/roles");
var utils_1 = require("../utils");
var filter = require("express-validator/filter");
var utils_2 = require("../utils");
var mail_1 = require("../utils/mail");
var errors_2 = require("../constants/errors");
var constants_1 = require("../constants");
var userRepo_1 = require("../repositories/userRepo");
var roleRepo_1 = require("../repositories/roleRepo");
var main_1 = require("../config/main");
var mailgunService = require("mailgun-js");
var mailgun = mailgunService({ apiKey: main_1.default.mailgun_api_key, domain: main_1.default.mailgun_domain });
var register = utils_2.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data, user, token, createdUser, userModel, userInfo;
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
                    return [2 /*return*/, res.status(422).json(utils_1.formatError(errors_2.EMAIL_ALREADY_IN_USE))];
                }
                return [4 /*yield*/, utils_1.generateRandomToken()];
            case 2:
                token = _a.sent();
                return [4 /*yield*/, userRepo_1.createUser(__assign({}, data, { verify_token: token }))];
            case 3:
                createdUser = _a.sent();
                userModel = createdUser.get({ plain: true });
                return [4 /*yield*/, roleRepo_1.associateRole(userModel.id, utils_2.getRoleId(roles_1.USER_ROLE))];
            case 4:
                _a.sent();
                userInfo = {
                    _id: userModel.id,
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
    var user, userToBeUpdated, userInfo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                return [4 /*yield*/, userRepo_1.findUserByEmail(user.email)];
            case 1:
                userToBeUpdated = _a.sent();
                return [4 /*yield*/, userToBeUpdated.update({
                        password_reset_token: null,
                        password_reset_token_expired_at: null
                    })];
            case 2:
                _a.sent();
                userInfo = {
                    _id: user.id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    roles: [roles_1.USER_ROLE]
                };
                res.status(200).json({
                    token: "JWT " + utils_2.generateToken(userInfo),
                    user: userInfo
                });
                return [2 /*return*/];
        }
    });
}); });
exports.login = login;
var forgotPassword = utils_2.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data, user, token, mailData;
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
                if (!user) {
                    return [2 /*return*/, res.status(422).json(utils_1.formatError(errors_2.USER_NOT_FOUND))];
                }
                return [4 /*yield*/, utils_1.generateRandomToken()];
            case 2:
                token = _a.sent();
                return [4 /*yield*/, user.update({
                        password_reset_token: token,
                        password_reset_token_expired_at: Date.now() + constants_1.ONE_HOUR
                    })];
            case 3:
                _a.sent();
                mailData = {
                    from: 'NoReply<user@smtp.mailgun.org>',
                    to: user.email,
                    subject: 'Reset Password',
                    text: "" + 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://' + req.headers.host + "/reset-password/" + token + "\n\n" +
                        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
                };
                return [4 /*yield*/, mail_1.sendEmail(mailData, mailgun)];
            case 4:
                _a.sent();
                res.json({ message: 'Please check your email for the link to reset your password' });
                return [2 /*return*/];
        }
    });
}); });
exports.forgotPassword = forgotPassword;
var resetPassword = utils_2.catchErrors(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var errors, data, user, olderThanOneHour, _a, _b, _c, mailData;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                errors = utils_1.getErrors(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(422).json({ errors: errors.mapped() })];
                }
                data = filter.matchedData(req);
                return [4 /*yield*/, userRepo_1.findUserByResetPasswordToken(data.token)];
            case 1:
                user = _d.sent();
                if (!user) {
                    return [2 /*return*/, res.status(422).json(utils_1.formatError(errors_1.INVALID_PASSWORD_RESET_TOKEN))];
                }
                olderThanOneHour = (Date.now() - (new Date(user.password_reset_token_expired_at).getTime())) > constants_1.ONE_HOUR;
                if (olderThanOneHour) {
                    return [2 /*return*/, res.status(422).json(utils_1.formatError(errors_1.EXPIRED_PASSWORD_RESET_TOKEN))];
                }
                _b = (_a = user).update;
                _c = {
                    password_reset_token: null,
                    password_reset_token_expired_at: null
                };
                return [4 /*yield*/, utils_2.generateHash(data.password)];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.password = _d.sent(),
                        _c)])];
            case 3:
                _d.sent();
                mailData = {
                    from: 'NoReply<user@smtp.mailgun.org>',
                    to: user.email,
                    subject: 'Password Changed',
                    text: "You are receiving this email because you changed your password.\n\n\n      'If you did not request this change, please contact us immediately."
                };
                return [4 /*yield*/, mail_1.sendEmail(mailData, mailgun)];
            case 4:
                _d.sent();
                res.status(200).json({ message: messages_1.PASSWORD_CHANGE_SUCCESS });
                return [2 /*return*/];
        }
    });
}); });
exports.resetPassword = resetPassword;
//# sourceMappingURL=AuthController.js.map