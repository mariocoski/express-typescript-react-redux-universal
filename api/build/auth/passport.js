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
var passport = require("passport");
var passport_jwt_1 = require("passport-jwt");
var utils_1 = require("../utils");
var passport_local_1 = require("passport-local");
var userRepo_1 = require("../repositories/userRepo");
var errors_1 = require("../constants/errors");
var errors_2 = require("../lib/errors");
var localOptions = {
    usernameField: 'email'
};
var localLogin = new passport_local_1.Strategy(localOptions, function (email, password, done) { return __awaiter(_this, void 0, void 0, function () {
    var user, userModel, isMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, userRepo_1.findUserByEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, done(null, false)];
                }
                userModel = user.get({ plain: true });
                return [4 /*yield*/, utils_1.comparePassword(password, userModel.password)];
            case 2:
                isMatch = _a.sent();
                if (isMatch) {
                    return [2 /*return*/, done(null, user)];
                }
                return [2 /*return*/, done(null, false)];
        }
    });
}); });
var jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: utils_1.env('JWT_SECRET'),
    session: false
};
var jwtLogin = new passport_jwt_1.Strategy(jwtOptions, function (payload, done) { return __awaiter(_this, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("TUTAJ", payload);
                if (!payload._id) {
                    done(new errors_2.BadRequestError(), false);
                }
                return [4 /*yield*/, userRepo_1.findUserById(payload._id)];
            case 1:
                user = _a.sent();
                if (user) {
                    done(null, user);
                }
                else {
                    done(new errors_2.UnauthorizedError(), false);
                }
                return [2 /*return*/];
        }
    });
}); });
passport.use(localLogin);
passport.use(jwtLogin);
var requireAuth = function (req, res, next) {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(401);
            res.json(utils_1.formatError(errors_1.UNAUTHORIZED));
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.requireAuth = requireAuth;
var requireLogin = function (req, res, next) {
    var errors = utils_1.getErrors(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.status(422);
            res.json(utils_1.formatError(errors_1.INVALID_CREDENTIALS));
            return;
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.requireLogin = requireLogin;
//# sourceMappingURL=passport.js.map