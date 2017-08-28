'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('product',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_code: {
        type: Sequelize.STRING,
        unique: 'order_code',
        allowNull: false,
      },
    }
  );

  return Product;
};
