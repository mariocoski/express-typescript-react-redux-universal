"use strict";
module.exports = {
    hash: jest.fn(function () {
        return Promise.resolve('hashedpassword');
    }),
    compare: jest.fn(function () {
        return Promise.resolve(true);
    })
};
//# sourceMappingURL=bcrypt.js.map