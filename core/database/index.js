'use strict';
const Sequelize = require('sequelize');
const dbString = process.env.MYSQL_URL;
var sequelize = new Sequelize(dbString,
  {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);
const order = require('./models/order');
const product = require('./models/product');

var db = {};

db['product'] = product(sequelize);
db['order'] = order(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
