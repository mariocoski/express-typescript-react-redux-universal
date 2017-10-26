"use strict";
module.exports = jest.fn(function (options) {
    return {
        messages: jest.fn(function () {
            return {
                send: jest.fn()
            };
        })
    };
});
//# sourceMappingURL=mailgun-js.js.map