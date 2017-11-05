"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    validator.check('email', errors_1.EMAIL_IS_REQUIRED).exists(),
    validator.check('email', errors_1.EMAIL_IS_INVALID).isEmail().trim().normalizeEmail(),
    validator.check('password', errors_1.PASSWORD_IS_REQUIRED).exists(),
    validator.check('password', errors_1.PASSWORD_IS_TOO_SHORT).isLength({ min: 6 }),
    validator.check('first_name').trim(),
    validator.check('last_name').trim(),
    validator.check('bio').trim()
];
//# sourceMappingURL=validateRegister.js.map