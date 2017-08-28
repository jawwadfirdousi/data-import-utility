'use strict';

const Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('order',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      client_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      product_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },

    }
  );

  return Order;
};
