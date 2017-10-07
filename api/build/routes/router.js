"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
module.exports = function (app) {
    /*** AUTH ***/
    var authRoutes = express_1.Router();
    // authRoutes
    //   .post('register', register)
    //   .post('login', requireLogin, login)
    //   .post('forgot-password', forgotPassword)
    //   .post('reset-password/:token', verifyToken)
    //   .post('me-from-token', meFromToken);
    /*** API ***/
    /*** V1 ***/
    var apiV1Routes = express_1.Router();
    apiV1Routes.get('/', function (req, res) {
        res.status(401);
    });
    app.use('/api/v1', apiV1Routes);
    app.use('/auth', authRoutes);
};
//# sourceMappingURL=router.js.map