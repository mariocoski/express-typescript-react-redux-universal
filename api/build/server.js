"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.config();
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
var server = new http.Server(app);
models.sequelize.sync().then(function () {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
});
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
module.exports = server;
