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
var JWT = require("jsonwebtoken");
var roles_1 = require("../constants/roles");
var check_1 = require("express-validator/check");
var bcrypt = require("bcrypt");
var errors_1 = require("../lib/errors");
function resolvePort(portCandidate) {
    if (portCandidate === undefined) {
        throw new Error("Port " + portCandidate + " is not numeric");
    }
    var port = parseInt(portCandidate, 10);
    if (isNaN(port)) {
        throw new Error("Port " + portCandidate + " is not numeric");
    }
    if (port >= 0) {
        return port;
    }
    throw new Error("Port " + portCandidate + " is not numeric");
}
exports.resolvePort = resolvePort;
function generateToken(user) {
    return JWT.sign(user, env('JWT_SECRET'), {
        expiresIn: env('JWT_EXPIRATION_TIME')
    });
}
exports.generateToken = generateToken;
function getErrors(req) {
    return check_1.validationResult(req).formatWith(function (_a) {
        var location = _a.location, msg = _a.msg, param = _a.param, value = _a.value;
        return { message: msg };
    });
}
exports.getErrors = getErrors;
function formatError(message, stack) {
    if (stack === void 0) { stack = undefined; }
    return (stack !== undefined) ? { error: message, stack: stack } : { error: message };
}
exports.formatError = formatError;
function handleError(res, err) {
    console.error(err);
    var IS_PROD = process.env.NODE_ENV === 'production';
    switch (err.constructor) {
        case errors_1.BadRequestError:
            return res.status(400).json(formatError(err.message));
        case errors_1.NotFoundError:
            return res.status(404).json(formatError(err.message));
        case errors_1.ForbiddenError:
            return res.status(403).json(formatError(err.message));
        case errors_1.UnauthorizedError:
            return res.status(401).json(formatError(err.message));
        case errors_1.BaseError:
            var errObj = (IS_PROD) ? formatError(err.message) : formatError(err.message.err.stack);
            return res.status(500).json(errObj);
        default:
            return res.status(500).json(err.message);
    }
}
exports.handleError = handleError;
;
exports.catchErrors = function (handler) { return function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, handler(req, res)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, handleError(res, err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.getRoleId = function (role) {
    switch (role) {
        case roles_1.USER_ROLE:
            return 1;
        case roles_1.ADMIN_ROLE:
            return 2;
        case roles_1.SUPERADMIN_ROLE:
            return 3;
        default:
            throw new Error("Role " + role + " is not defined");
    }
};
function env(key, defaultVal) {
    if (defaultVal === void 0) { defaultVal = undefined; }
    var myVal = process.env[key];
    if (typeof myVal === 'undefined' && defaultVal === undefined) {
        throw new Error("No ENV " + key + " was found");
    }
    if (typeof myVal === 'string') {
        return myVal;
    }
    if (typeof defaultVal === 'string') {
        return defaultVal;
    }
    throw new Error("No ENV " + key + " was found");
}
exports.env = env;
function generateHash(password) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcrypt.hash(password, 10)];
        });
    });
}
exports.generateHash = generateHash;
function comparePassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, bcrypt.compare(password, hashedPassword)];
        });
    });
}
exports.comparePassword = comparePassword;
function seedUsers(queryInterface) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _b = (_a = queryInterface).bulkInsert;
                    _c = ['users'];
                    _d = {
                        id: 1,
                        email: 'user@test.com'
                    };
                    return [4 /*yield*/, generateHash('password')];
                case 1:
                    _e = [
                        (_d.password = _h.sent(),
                            _d.first_name = 'Joe',
                            _d.last_name = 'Doe',
                            _d.bio = 'Joe is a user',
                            _d.created_at = new Date(),
                            _d.updated_at = new Date(),
                            _d)
                    ];
                    _f = {
                        id: 2,
                        email: 'admin@test.com'
                    };
                    return [4 /*yield*/, generateHash('password')];
                case 2:
                    _e = _e.concat([
                        (_f.password = _h.sent(),
                            _f.first_name = 'John',
                            _f.last_name = 'Doe',
                            _f.bio = 'John is an admin',
                            _f.created_at = new Date(),
                            _f.updated_at = new Date(),
                            _f)
                    ]);
                    _g = {
                        id: 3,
                        email: 'superadmin@test.com'
                    };
                    return [4 /*yield*/, generateHash('password')];
                case 3: return [2 /*return*/, _b.apply(_a, _c.concat([_e.concat([
                            (_g.password = _h.sent(),
                                _g.first_name = 'Jane',
                                _g.last_name = 'Doe',
                                _g.bio = 'Jane is a superadmin',
                                _g.created_at = new Date(),
                                _g.updated_at = new Date(),
                                _g)
                        ]), {}]))];
            }
        });
    });
}
exports.seedUsers = seedUsers;
function seedRoles(queryInterface) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, queryInterface.bulkInsert('roles', [
                    {
                        id: 1,
                        name: roles_1.USER_ROLE,
                        description: 'user role'
                    },
                    {
                        id: 2,
                        name: roles_1.ADMIN_ROLE,
                        description: 'admin role'
                    },
                    {
                        id: 3,
                        name: roles_1.SUPERADMIN_ROLE,
                        description: 'superadmin role'
                    }
                ], {})];
        });
    });
}
exports.seedRoles = seedRoles;
function seedUsersRoles(queryInterface) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, queryInterface.bulkInsert('users_roles', [
                    {
                        user_id: 1,
                        role_id: exports.getRoleId(roles_1.USER_ROLE)
                    },
                    {
                        user_id: 2,
                        role_id: exports.getRoleId(roles_1.USER_ROLE)
                    },
                    {
                        user_id: 2,
                        role_id: exports.getRoleId(roles_1.ADMIN_ROLE)
                    },
                    {
                        user_id: 3,
                        role_id: exports.getRoleId(roles_1.USER_ROLE)
                    },
                    {
                        user_id: 3,
                        role_id: exports.getRoleId(roles_1.ADMIN_ROLE)
                    },
                    {
                        user_id: 3,
                        role_id: exports.getRoleId(roles_1.SUPERADMIN_ROLE)
                    },
                ], {})];
        });
    });
}
exports.seedUsersRoles = seedUsersRoles;
function seedDb(queryInterface) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 4, , 5]);
                                return [4 /*yield*/, seedUsers(queryInterface)];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, seedRoles(queryInterface)];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, seedUsersRoles(queryInterface)];
                            case 3:
                                _a.sent();
                                resolve();
                                return [3 /*break*/, 5];
                            case 4:
                                e_1 = _a.sent();
                                reject(e_1);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.seedDb = seedDb;
// export function isAuthorized(role: String){
//   return function(req: Request,res: ResponssetUserInfoe,next:Function){
//     const user = req.user;
//     User.findById(user._id, (err, foundUser:any)=>{
//       if(err) {
//         res.status(422).json({error: 'No user found'});
//         return next(err);
//       }
//       if(getRole(foundUser.role) >= getRole(role)){
//         return next();
//       }
//       res.status(401).json({error: "You are not authorized to see the content"});
//       return next(err);
//     });
//   }
// }
//# sourceMappingURL=index.js.map