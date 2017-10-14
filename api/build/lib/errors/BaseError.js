"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var default_1 = /** @class */ (function () {
    function default_1(message) {
        this.message = message;
        this.name = this.constructor.name;
        this.stack = new Error(message).stack;
    }
    return default_1;
}());
exports.default = default_1;
//# sourceMappingURL=BaseError.js.map