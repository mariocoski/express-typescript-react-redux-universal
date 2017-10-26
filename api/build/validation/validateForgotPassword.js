"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    validator.check('email', errors_1.EMAIL_IS_REQUIRED).exists(),
    validator.check('email', errors_1.EMAIL_IS_INVALID).isEmail().trim().normalizeEmail()
];
//# sourceMappingURL=validateForgotPassword.js.map