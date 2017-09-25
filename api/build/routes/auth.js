"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var router = express_1.Router();
router
    .post('/register', AuthController_1.register)
    .post('/login', AuthController_1.requireLogin, AuthController_1.login)
    .post('/forgot-password', AuthController_1.forgotPassword)
    .post('/reset-password/:token', AuthController_1.verifyToken)
    .post('/me-from-token', AuthController_1.meFromToken);
exports.default = router;
