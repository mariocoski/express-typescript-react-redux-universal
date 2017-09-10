"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profile_1 = require("./profile");
var routes_1 = require("../../constants/routes");
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send('ok');
});
router.use(routes_1.PROFILE_ROUTE, profile_1.default);
exports.default = router;
