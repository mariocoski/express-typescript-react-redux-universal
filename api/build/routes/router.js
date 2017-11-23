"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var TodosController_1 = require("../controllers/TodosController");
var ProfileController_1 = require("../controllers/ProfileController");
var index_1 = require("../validation/index");
var passport_1 = require("../auth/passport");
module.exports = function (app) {
    /*** AUTH ***/
    var authRoutes = express_1.Router();
    // authRoutes
    authRoutes.post('/register', index_1.validateRegister, AuthController_1.register)
        .post('/login', index_1.validateLogin, passport_1.requireLogin, AuthController_1.login)
        .post('/forgot-password', index_1.validateForgotPassword, AuthController_1.forgotPassword)
        .post('/reset-password', index_1.validateResetPassword, AuthController_1.resetPassword);
    /*** API ***/
    /*** V1 ***/
    var apiV1Routes = express_1.Router();
    apiV1Routes
        .get('/', function (req, res) {
        res.status(200).json({ message: "api ready..." });
    })
        .get('/profile/:userId', passport_1.requireAuth, ProfileController_1.show)
        .patch('/profile/:userId', passport_1.requireAuth, index_1.validateUpdateProfile, ProfileController_1.update);
    //todos
    apiV1Routes.get('/todos', passport_1.requireAuth, TodosController_1.getAllTodos)
        .post('/todos', passport_1.requireAuth, index_1.validateCreateTodo, TodosController_1.storeTodo)
        .patch('/todos/:todoId', passport_1.requireAuth, index_1.validateUpdateTodo, TodosController_1.updateTodo)
        .delete('/todos/:todoId', passport_1.requireAuth, TodosController_1.deleteTodo);
    app.use('/api/v1', apiV1Routes);
    app.use('/auth', authRoutes);
    return app;
};
//# sourceMappingURL=router.js.map