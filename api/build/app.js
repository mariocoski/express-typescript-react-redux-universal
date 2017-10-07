"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var router = require('./routes/router');
var app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(body_parser_1.default.json()); // Send JSON responses
app.use(morgan_1.default('dev'));
var corsMiddleware = cors_1.default({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);
router(app);
module.exports = app;
//# sourceMappingURL=app.js.map