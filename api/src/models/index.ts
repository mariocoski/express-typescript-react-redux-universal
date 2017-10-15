
import * as fs from 'fs';
import * as path from 'path';
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const env       = process.env.NODE_ENV || 'development';
const config    = require(path.resolve(__dirname,'../config/database'))[env];

const sequelize  = new Sequelize(config.database, config.username, config.password, {...config, operatorsAliases: false, logging: false});

let db: any = {};

const files= fs.readdirSync(__dirname);
  files.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
  }).forEach(file  => {
    const model: any = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

interface databaseInterface {
  sequelize: Object,
  Sequelize: Object, 
  User: Object
}
const database:databaseInterface = {sequelize, Sequelize, ...db};
module.exports = database;