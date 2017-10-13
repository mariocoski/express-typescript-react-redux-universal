const env = require('../utils').env; 
const path = require('path');
module.exports = {
  development: {
    username: 'root',
    password: 'root',
    database: 'database_dev',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  test: {
    username: env('TEST_DB_USERNAME'),
    password: env('TEST_DB_PASSWORD'),
    database: env('TEST_DB_NAME'),
    dialect: 'mysql',
    // storage: path.resolve('../database/database.sqlite')
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql'
  }
}