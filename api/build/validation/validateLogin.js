"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var check_1 = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    check_1.check('email', errors_1.EMAIL_IS_REQUIRED).exists(),
    check_1.check('email', errors_1.EMAIL_IS_INVALID).isEmail().trim().normalizeEmail(),
    check_1.check('password', errors_1.PASSWORD_IS_REQUIRED).exists()
];
//# sourceMappingURL=validateLogin.js.map