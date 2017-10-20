"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { check, validationResult } from 'express-validator/check';
var validator = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    validator.check('email', errors_1.EMAIL_IS_REQUIRED).exists(),
    validator.check('email', errors_1.EMAIL_IS_INVALID).isEmail().trim().normalizeEmail(),
    validator.check('password', errors_1.PASSWORD_IS_REQUIRED).exists()
];
//# sourceMappingURL=validateLogin.js.map