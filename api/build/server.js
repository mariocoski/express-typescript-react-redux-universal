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
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
var utils_1 = require("./utils");
var socketIO = require("socket.io");
var http = require("http");
var iconvLite = require('iconv-lite');
iconvLite.encodingExists('foo');
var app = require('./app');
var models = require('./models');
process.on('SIGINT', function () {
    process.exit(0);
});
var IS_TEST = process.env.NODE_ENV === 'test';
var portCandidate = IS_TEST ? utils_1.env('TEST_PORT') : utils_1.env('PORT');
var port = utils_1.resolvePort(portCandidate);
function dbInit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, models.sequelize.sync()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var server = new http.Server(app);
if (process.env.NODE_ENV !== 'test') {
    dbInit();
}
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
var io = socketIO(server);
function onListening() {
    if (!IS_TEST) {
        console.log("Listening at http://localhost:" + port);
    }
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
if (process.env.NODE_ENV === 'production') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
    });
}
app.use(function (err, req, res, next) {
    console.error('error : ', err);
    res.status(err.status || 500);
});
module.exports = server;
//# sourceMappingURL=server.js.map