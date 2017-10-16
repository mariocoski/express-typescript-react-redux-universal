"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var expressValidator = require("express-validator");
var compression = require("compression");
var errors_1 = require("./lib/errors");
var utils_1 = require("./utils");
var router = require('./routes/router');
var app = express();
app.use(bodyParser.json());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
// app.use(logger('dev'));
var corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);
router(app);
app.use(function (req, res, next) {
    next(new errors_1.NotFoundError());
});
app.use(function (err, req, res, next) {
    utils_1.handleError(res, err);
});
module.exports = app;
//# sourceMappingURL=app.js.map