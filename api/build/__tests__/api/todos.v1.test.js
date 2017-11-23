"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var main_1 = require("../../config/main");
var helpers_1 = require("../helpers");
var utils_1 = require("../../utils");
var todoRepo_1 = require("../../repositories/todoRepo");
var userRepo_1 = require("../../repositories/userRepo");
var errors_1 = require("../../constants/errors");
var db = require('../../models');
describe('API V1', function () {
    var request = require('supertest');
    var app;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    app = require('../../server');
                    return [2 /*return*/];
            }
        });
    }); });
    afterEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            app.close();
            return [2 /*return*/];
        });
    }); });
    it('should not get list of todos when unauthenticated', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).get('/api/v1/todos')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with 401 when token is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .get('/api/v1/todos')
                        .set('Authorization', 'Bearer invalid-token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    expect(response.text).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should show all todos for a authenticated user', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, todo1, todo2, deletedTodo3, otherUserTodo, createdTodo1, createdTodo2, deletedTodo, token, response, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, userRepo_1.createUser(validUser)];
                case 1:
                    createdUser = _a.sent();
                    todo1 = { user_id: createdUser.id, title: 'Do the shopping',
                        description: 'Go to supermarket and buy: milk', completed_at: null, deleted_at: null };
                    todo2 = { user_id: createdUser.id, title: 'Go to the gym',
                        description: 'Legs and triceps', completed_at: null, deleted_at: null };
                    deletedTodo3 = { user_id: createdUser.id, title: 'Todo has been deleted',
                        description: 'This todo has been deleted', completed_at: null, deleted_at: Date.now() };
                    otherUserTodo = { user_id: 999, title: 'This other user todo',
                        description: 'Should not be find in results', completed_at: null, deleted_at: null };
                    return [4 /*yield*/, todoRepo_1.createTodo(todo1)];
                case 2:
                    createdTodo1 = _a.sent();
                    return [4 /*yield*/, todoRepo_1.createTodo(todo2)];
                case 3:
                    createdTodo2 = _a.sent();
                    return [4 /*yield*/, todoRepo_1.createTodo(deletedTodo3)];
                case 4:
                    deletedTodo = _a.sent();
                    return [4 /*yield*/, todoRepo_1.createTodo(otherUserTodo)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 6:
                    token = _a.sent();
                    return [4 /*yield*/, request(app)
                            .get('/api/v1/todos')
                            .set('Authorization', "Bearer " + token)];
                case 7:
                    response = _a.sent();
                    body = JSON.parse(response.text);
                    expect(body.data).toHaveLength(2);
                    expect(body.data[0]).toMatchObject(todo1);
                    expect(body.data[1]).toMatchObject(todo2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not create a new todo when unauthenticated', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).post('/api/v1/todos')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with 401 when token is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .post('/api/v1/todos')
                        .set('Authorization', 'Bearer invalid-token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to create a new todo without title', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, userRepo_1.createUser(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, request(app).post('/api/v1/todos')
                            .set('Authorization', "Bearer " + token)
                            .send({})];
                case 3:
                    response = _a.sent();
                    helpers_1.expectError(response, errors_1.TITLE_IS_REQUIRED);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should sucessfully create a new todo', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, todo, createdUser, token, response, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    todo = { title: 'Shopping', description: 'Buy bread, milk and butter' };
                    return [4 /*yield*/, userRepo_1.createUser(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, request(app).post('/api/v1/todos')
                            .set('Authorization', "Bearer " + token)
                            .send(todo)];
                case 3:
                    response = _a.sent();
                    return [4 /*yield*/, todoRepo_1.getTodosForUserId(createdUser.id)];
                case 4:
                    todos = _a.sent();
                    expect(todos).toHaveLength(1);
                    expect(todos[0].title).toEqual(todo.title);
                    expect(todos[0].title).toEqual(todo.title);
                    expect(response.statusCode).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update todo when unauthenticated', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).patch('/api/v1/todos/1')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with 401 when updating todo and token is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .patch('/api/v1/todos/1')
                        .set('Authorization', 'Bearer invalid-token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to update todo without a title', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, userRepo_1.createUser(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, request(app).patch('/api/v1/todos/1')
                            .set('Authorization', "Bearer " + token)
                            .send({})];
                case 3:
                    response = _a.sent();
                    helpers_1.expectError(response, errors_1.TITLE_IS_REQUIRED);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not update todo when data are valid but it does not belong to user', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, newData, someoneElseTodo, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, db.User.create(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    newData = { title: 'title', description: 'description', user_id: 999,
                        completed_at: null };
                    return [4 /*yield*/, todoRepo_1.createTodo(newData)];
                case 3:
                    someoneElseTodo = _a.sent();
                    return [4 /*yield*/, request(app)
                            .patch("/api/v1/todos/" + someoneElseTodo.id)
                            .set('Authorization', "Bearer " + token)
                            .type('form')
                            .send(newData)];
                case 4:
                    response = _a.sent();
                    expect(response.statusCode).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update todo when data are valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, oldData, todoToBeUpdated, newData, response, updatedTodo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, db.User.create(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    oldData = { title: 'Old title', description: 'Old description',
                        user_id: createdUser.id, completed_at: null };
                    return [4 /*yield*/, todoRepo_1.createTodo(oldData)];
                case 3:
                    todoToBeUpdated = _a.sent();
                    newData = {
                        title: 'New Title',
                        description: 'New Description',
                        completed_at: new Date()
                    };
                    return [4 /*yield*/, request(app)
                            .patch("/api/v1/todos/" + todoToBeUpdated.id)
                            .set('Authorization', "Bearer " + token)
                            .type('form')
                            .send(newData)];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, todoRepo_1.getTodoById(todoToBeUpdated.id)];
                case 5:
                    updatedTodo = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(updatedTodo.title).toBe(newData.title);
                    expect(updatedTodo.description).toBe(newData.description);
                    expect(updatedTodo.completed_at).toEqual(newData.completed_at);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not delete todo when unauthenticated', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).delete('/api/v1/todos/1')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should respond with 401 when deleting todo and token is invalid', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app)
                        .delete('/api/v1/todos/1')
                        .set('Authorization', 'Bearer invalid-token')];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return 404 when todo does not exist', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, db.User.create(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, request(app)
                            .delete("/api/v1/todos/999")
                            .set('Authorization', "Bearer " + token)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not delete todo when it does not belong to user', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, newData, someoneElseTodo, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, db.User.create(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    newData = { title: 'title', description: 'description', user_id: 999,
                        completed_at: null };
                    return [4 /*yield*/, todoRepo_1.createTodo(newData)];
                case 3:
                    someoneElseTodo = _a.sent();
                    return [4 /*yield*/, request(app)
                            .delete("/api/v1/todos/" + someoneElseTodo.id)
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    expect(response.statusCode).toBe(403);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete todo when exists and belongs to user', function () { return __awaiter(_this, void 0, void 0, function () {
        var validUser, createdUser, token, data, todoToBeDeleted, response, todo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validUser = { email: main_1.default.mailgun_test_recipient, password: 'password' };
                    return [4 /*yield*/, db.User.create(validUser)];
                case 1:
                    createdUser = _a.sent();
                    return [4 /*yield*/, utils_1.generateToken({ _id: createdUser.id })];
                case 2:
                    token = _a.sent();
                    data = { title: 'Old title', description: 'Old description',
                        user_id: createdUser.id, completed_at: null };
                    return [4 /*yield*/, todoRepo_1.createTodo(data)];
                case 3:
                    todoToBeDeleted = _a.sent();
                    return [4 /*yield*/, request(app)
                            .delete("/api/v1/todos/" + todoToBeDeleted.id)
                            .set('Authorization', "Bearer " + token)];
                case 4:
                    response = _a.sent();
                    return [4 /*yield*/, todoRepo_1.getTodoById(todoToBeDeleted.id)];
                case 5:
                    todo = _a.sent();
                    expect(todo).toBeNull();
                    expect(response.statusCode).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=todos.v1.test.js.map