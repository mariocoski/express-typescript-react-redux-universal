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
var utils_1 = require("../../utils");
var errors_1 = require("../../lib/errors");
var roles_js_1 = require("../../constants/roles.js");
jest.mock('bcrypt', function () { return ({
    hash: jest.fn(function () {
        return Promise.resolve('hashedpassword');
    }),
    compare: jest.fn(function (password) {
        if (password === 'password') {
            return Promise.resolve(true);
        }
        else {
            return Promise.reject(false);
        }
    })
}); });
jest.mock('jsonwebtoken', function () { return ({
    sign: jest.fn(function () {
        return "JWT token";
    })
}); });
var bcrypt = require("bcrypt");
describe('UTILS', function () {
    it('can seed database', function () { return __awaiter(_this, void 0, void 0, function () {
        var queryInterface, mock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryInterface = {};
                    mock = queryInterface.bulkInsert = jest.fn();
                    return [4 /*yield*/, utils_1.seedDb(queryInterface)];
                case 1:
                    _a.sent();
                    expect(mock.mock.calls.length).toBe(3);
                    expect(mock.mock.calls[0][0]).toBe('users');
                    expect(mock.mock.calls[1][0]).toBe('roles');
                    expect(mock.mock.calls[2][0]).toBe('users_roles');
                    return [2 /*return*/];
            }
        });
    }); });
    it('can get default value of env variable', function () {
        expect(utils_1.env('FOOBAR', 'bar')).toBe('bar');
    });
    it("can throw an exception when default value \n    not provided and env var does not exist", function () {
        var shouldThrowError = function () {
            utils_1.env('FOOBAR');
        };
        expect(shouldThrowError).toThrowError(/No ENV FOOBAR was found/);
    });
    test('if UnauthorizedError has message and is an instance of Base error', function () {
        expect(new errors_1.UnauthorizedError().message).toMatch('Unauthorized');
        expect(errors_1.UnauthorizedError.prototype).toBeInstanceOf(errors_1.BaseError);
    });
    test('if BadRequestError has message and is an instance of Base error', function () {
        expect(new errors_1.BadRequestError().message).toMatch('Bad request');
        expect(errors_1.BadRequestError.prototype).toBeInstanceOf(errors_1.BaseError);
    });
    test('if ForbiddenError has message and is an instance of Base error', function () {
        expect(new errors_1.NotFoundError().message).toMatch('Not found');
        expect(errors_1.NotFoundError.prototype).toBeInstanceOf(errors_1.BaseError);
    });
    test('if ForbiddenError has message and is an instance of Base error', function () {
        expect(new errors_1.ForbiddenError().message).toMatch('Forbidden');
        expect(errors_1.ForbiddenError.prototype).toBeInstanceOf(errors_1.BaseError);
    });
    it('can generate hash', function () { return __awaiter(_this, void 0, void 0, function () {
        var hash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.generateHash('password', bcrypt)];
                case 1:
                    hash = _a.sent();
                    expect(hash).toBe('hashedpassword');
                    return [2 /*return*/];
            }
        });
    }); });
    it('can verify hash', function () { return __awaiter(_this, void 0, void 0, function () {
        var match;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.comparePassword('password', 'hashedpassword', bcrypt)];
                case 1:
                    match = _a.sent();
                    expect(match).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    jest.mock('jsonwebtoken');
    it('can generate token for a user', function () { return __awaiter(_this, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, utils_1.generateToken({})];
                case 1:
                    token = _a.sent();
                    expect(token).toBe('JWT token');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get role by id', function () {
        var shouldThrowError = function () {
            utils_1.getRoleId('DOES_NOT_EXIST');
        };
        expect(utils_1.getRoleId(roles_js_1.USER_ROLE)).toBe(1);
        expect(utils_1.getRoleId(roles_js_1.ADMIN_ROLE)).toBe(2);
        expect(utils_1.getRoleId(roles_js_1.SUPERADMIN_ROLE)).toBe(3);
        expect(shouldThrowError).toThrow();
    });
    it('can format an error response', function () {
        var error = 'Email already in use';
        expect(utils_1.formatError(error)).toEqual({ error: error });
    });
    it('can format an error response', function () {
        var shouldThrowError = function () {
            utils_1.resolvePort(undefined);
        };
        expect(utils_1.resolvePort('3000')).toEqual(3000);
        expect(shouldThrowError).toThrowError('Port undefined is not numeric');
    });
    it('can format an error response', function () {
        var shouldThrowError = function () {
            utils_1.resolvePort(undefined);
        };
        expect(utils_1.resolvePort('3000')).toEqual(3000);
        expect(shouldThrowError).toThrowError('Port undefined is not numeric');
    });
    it('should throw error when syscall not equals listen', function () {
        var port = 3000;
        var newErr = { syscall: 'not_listen' };
        var shouldThrowError = function () {
            utils_1.onError(newErr, 3000);
        };
        expect(shouldThrowError).toThrowError();
    });
    it('should throw error for not known code', function () {
        var port = 3000;
        var newErr = new Error();
        var shouldThrowError = function () {
            utils_1.onError(newErr, port);
        };
        expect(shouldThrowError).toThrowError();
    });
});
//# sourceMappingURL=utils.test.js.map