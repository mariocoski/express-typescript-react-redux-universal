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
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.config();
}
var JWT = require("jsonwebtoken");
var check_1 = require("express-validator/check");
// import {User} from '../models/user';
// import {BadRequestError, NotFoundError, ForbiddenError,UnauthorizedError, BaseError } from '../lib/errors';
function resolvePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return 3000;
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
/*
const generateModelRoutes = (model) => {
  const routeSuffix = model.modelName.toLowerCase();
  const authentication = (req, res, next) =>
    passport.authenticate(
      ['jwt', 'clientBasic'],
      DEFAULT_PASSPORT_OPTIONS,
      (err, user) => {
        if (err) {
          return handleError(res, err);
        }
        req.user = user;
        return next();
      }
    )(req, res, next);
  generateConnectionsRoute(model, routeSuffix, authentication);
  generateIndexesRoute(model, routeSuffix, authentication);
};

*/
function handleError(res, err) {
    console.error(err);
    switch (err.constructor) {
        // case BadRequestError:
        //   return res.status(400).send(err.message);
        // case NotFoundError:
        //   return res.status(404).send(err.message);
        // case ForbiddenError:
        //   return res.status(403).send(err.message);
        // case UnauthorizedError:
        //   return res.status(401).send(err.message);
        // case BaseError:
        //   return res.status(500).send(`${err.message}\n${err.stack}`);
        default:
            return res.status(500).send(err);
    }
}
exports.handleError = handleError;
;
function catchErrors(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, catchErrors(req, res)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    return [2 /*return*/, handleError(res, err_1)];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.catchErrors = catchErrors;
;
exports.setUserInfo = function (request) {
    var getUserInfo = {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role
    };
    return getUserInfo;
};
exports.getRole = function (checkRole) {
    var role;
    switch (checkRole) {
        // case ROLE_SUPERADMIN: role = 4; break;
        // case ROLE_ADMIN: role = 3; break;
        // case ROLE_PROFESSIONAL: role = 2; break;
        // case ROLE_USER: role = 1; break;
        default: role = 1;
    }
    return role;
};
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
function env(key) {
    var myVal = process.env[key];
    if (myVal === undefined) {
        throw new Error("No ENV " + key + " not found");
    }
    return myVal;
}
exports.env = env;
//# sourceMappingURL=index.js.map