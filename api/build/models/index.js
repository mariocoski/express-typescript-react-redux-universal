"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Sequelize = require('sequelize');
var Sequelize = require('sequelize');
var utils_1 = require("../utils");
var fs = require("fs");
var path = require("path");
var sequelize = new Sequelize(utils_1.env('DB_NAME'), utils_1.env('DB_USER'), utils_1.env('DB_PASS'), {
    host: utils_1.env('DB_HOST'),
    port: parseInt(utils_1.env('DB_PORT')),
    dialect: utils_1.env('DB_TYPE'),
    operatorsAliases: false
});
var db = {};
var files = fs.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "index.ts");
});
files.forEach(function (file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});
module.exports = __assign({ sequelize: sequelize, Sequelize: Sequelize }, db);
