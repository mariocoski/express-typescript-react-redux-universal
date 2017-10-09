const env = require('../utils').env; 

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
    dialect: 'sqlite'
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: 'mysql'
  }
}