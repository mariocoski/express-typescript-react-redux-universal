"use strict";
var path = require('path');
module.exports = {
    development: {
        username: 'root',
        password: 'root',
        database: 'database_dev',
        host: '127.0.0.1',
        dialect: 'mysql',
        operatorsAliases: false
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        dialect: 'sqlite',
        storage: ':memory:',
        operatorsAliases: false
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        operatorsAliases: false,
        dialect: 'mysql'
    }
};
//# sourceMappingURL=database.js.map