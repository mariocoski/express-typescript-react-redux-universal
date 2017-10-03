"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
var express = require("express");
var v1_1 = require("./routes/v1");
var routes_1 = require("./constants/routes");
var mongoose = require("mongoose");
var utils_1 = require("./utils");
var bodyParser = require("body-parser");
var logger = require("morgan");
var routes_2 = require("./constants/routes");
var auth_1 = require("./routes/auth");
var cors = require("cors");
var socketIO = require("socket.io");
var http = require("http");
process.on('SIGINT', function () {
    process.exit(0);
});
var app = express();
var portCandidate = process.env.NODE_ENV === 'test' ?
    process.env.TEST_PORT : process.env.PORT;
var port = utils_1.resolvePort(portCandidate);
var server = new http.Server(app);
var io = new socketIO(server);
app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev'));
var corsMiddleware = cors({ origin: '*', preflightContinue: true });
app.use(corsMiddleware);
app.options('*', corsMiddleware);
var db_host = utils_1.env('DB_HOST');
mongoose.connect(db_host, { useMongoClient: true });
app.use(routes_1.API_V1, v1_1.default);
app.use(routes_2.AUTH_ROUTE, auth_1.default);
server.listen(port);
server.on('listening', function () {
    console.log("Listening at http://localhost:" + port);
});
server.on('error', function (error) {
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
});
exports.default = server;
