"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var validateRegister_1 = require("../validation/validateRegister");
module.exports = function (app) {
    /*** AUTH ***/
    var authRoutes = express_1.Router();
    // authRoutes
    authRoutes.post('/register', validateRegister_1.default, AuthController_1.register);
    // authRoutes.post('/register', validateRegister, register);
    //   .post('login', requireLogin, login)
    //   .post('forgot-password', forgotPassword)
    //   .post('reset-password/:token', verifyToken)
    //   .post('me-from-token', meFromToken);
    /*** API ***/
    /*** V1 ***/
    var apiV1Routes = express_1.Router();
    apiV1Routes.get('/', function (req, res) {
        res.status(200).json({ message: "api ready..." });
    });
    app.use('/api/v1', apiV1Routes);
    app.use('/auth', authRoutes);
    return app;
};
