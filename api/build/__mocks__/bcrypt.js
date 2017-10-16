"use strict";
module.exports = {
    hash: jest.fn(function () {
        return Promise.resolve('hashedpassword');
    }),
    compare: jest.fn(function (password) {
        if (password === 'password') {
            return Promise.resolve(true);
        }
        else {
            return Promise.reject(false);
        }
    })
};
//# sourceMappingURL=bcrypt.js.map