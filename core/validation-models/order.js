'use strict';

const joi = require('joi');

module.exports = joi.object({
  order_code: joi.string().required(),
  client_name: joi.string().required(),
  product_code: joi.string().required(),
  quantity: joi.number().integer().required(),
});
