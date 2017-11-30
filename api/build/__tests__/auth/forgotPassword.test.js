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
var errors_1 = require("../../constants/errors");
var db = require('../../models');
var utils_1 = require("../../utils");
var userRepo_1 = require("../../repositories/userRepo");
var helpers_1 = require("../helpers");
var main_1 = require("../../config/main");
jest.mock('mailgun-js', function () {
    return jest.fn(function (options) {
        return {
            messages: jest.fn(function () {
                return {
                    send: jest.fn(function () { console.log('sent'); })
                };
            })
        };
    });
});
describe('FORGOT PASSWORD', function () {
    var request = require('supertest');
    var app;
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.sequelize.sync({ force: true })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, utils_1.seedDb(db.sequelize.queryInterface)];
                case 2:
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
    it('should fail to send reminder link without email', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expect.assertions(2);
                    return [4 /*yield*/, request(app).post('/auth/forgot-password')];
                case 1:
                    response = _a.sent();
                    helpers_1.expectError(response, errors_1.EMAIL_IS_REQUIRED);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to send reminder link valid email', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).post('/auth/forgot-password')
                        .type('form')
                        .send({ email: 'invalid@email' })];
                case 1:
                    response = _a.sent();
                    helpers_1.expectError(response, errors_1.EMAIL_IS_INVALID);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should fail to send reminder link when email does not match any user', function () { return __awaiter(_this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(app).post('/auth/forgot-password')
                        .type('form')
                        .send({ email: main_1.default.mailgun_test_recipient })];
                case 1:
                    response = _a.sent();
                    helpers_1.expectError(response, errors_1.USER_NOT_FOUND);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should send an email with link when email exists', function () { return __awaiter(_this, void 0, void 0, function () {
        var response, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.User.create({ email: main_1.default.mailgun_test_recipient, password: 'password' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, request(app).post('/auth/forgot-password')
                            .type('form')
                            .send({ email: main_1.default.mailgun_test_recipient })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, userRepo_1.findUserByEmail(main_1.default.mailgun_test_recipient)];
                case 3:
                    user = _a.sent();
                    expect(response.statusCode).toBe(200);
                    expect(user.password_reset_token).toBeTruthy();
                    expect(user.password_reset_token_expired_at).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=forgotPassword.test.js.map