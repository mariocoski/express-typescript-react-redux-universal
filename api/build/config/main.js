"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../utils");
exports.default = {
    mailgun_domain: utils_1.env('MAILGUN_DOMAIN'),
    mailgun_api_key: utils_1.env('MAILGUN_API_KEY'),
    mailgun_test_recipient: utils_1.env('MAILGUN_TEST_RECIPIENT')
};
//# sourceMappingURL=main.js.map