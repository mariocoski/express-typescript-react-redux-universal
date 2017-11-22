"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator = require("express-validator/check");
var errors_1 = require("../constants/errors");
exports.default = [
    validator.check('title', errors_1.TITLE_IS_REQUIRED).exists().trim(),
    validator.check('description').trim(),
    validator.check('completed_at').trim()
];
//# sourceMappingURL=validateUpdateTodo.js.map