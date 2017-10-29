"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    validator.check('token', errors_1.TOKEN_IS_REQUIRED).exists().trim(),
    validator.check('password', errors_1.PASSWORD_IS_REQUIRED).exists(),
    validator.check('password', errors_1.PASSWORD_IS_TOO_SHORT).isLength({ min: 6 }),
    validator.check('password_confirmation', errors_1.PASSWORD_CONFIRMATION_MUST_MATCH_PASSWORD)
        .exists()
        .custom(function (value, _a) {
        var req = _a.req;
        return value === req.body.password;
    })
];
//# sourceMappingURL=validateResetPassword.js.map