// const Sequelize = require('sequelize');
const Sequelize = require('sequelize');
import { env } from '../utils'; 
import * as fs from 'fs';
import * as path from 'path';

const sequelize = new Sequelize('test', env('DB_USER'), env('DB_PASS'), {
  host: env('DB_HOST'),
  port: parseInt(env('DB_PORT')),
  dialect: env('DB_TYPE'),
  operatorsAliases: false
});

let db: any = {};

const files= fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== "index.js")  && (file !== "index.ts");
  });
  files.forEach(file  => {
    const model: any = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

module.exports = {sequelize, Sequelize, ...db};
