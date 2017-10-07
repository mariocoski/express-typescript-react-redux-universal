"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}
var app = require('./app');
var utils_1 = require("./utils");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
process.on('SIGINT', function () {
    process.exit(0);
});
var portCandidate = process.env.NODE_ENV === 'test' ?
    utils_1.env('TEST_PORT') : utils_1.env('PORT');
var port = utils_1.resolvePort(portCandidate);
var server = new http_1.default.Server(app);
var io = new socket_io_1.default(server);
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
module.exports = server;
//# sourceMappingURL=server.js.map