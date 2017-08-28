const async = require('async');
const csv = require('csvtojson');
const orderSchema = require('../core/validation-models/order');
const storage = require('./storage');
const joi = require('joi');
const log = require('bunyan').createLogger({name: 'data-import'});
const file = require('./file');

/**
 * [Gets the stream from the given path and processes the file and write to DB]
 * @param  {object}   model    [connected sequelize instance]
 * @param  {object}   options  [options object must contain a path
 * and pathType (can only be either 'url' or 'local')]
 * @param  {Function} callback [function to execute once the operation has been completed]
 */
function processCSV (model, options, callback) {
  let insertCount = 0;
  const failedRecords = [];

  const uniqueProductCodes = new Set();

  // insert in bulk in batches.
  // batch limit is defined in the env variable
  const insertHandler = async.cargo((tasks, insertCallback) => {
    const products = [];
    const newProductCodesInBatch = new Set();

    tasks.map((order) => {
      // do not add in the local set if the current product_code has already been inserted.
      // can save us from multiple attempts for writing same products.
      if (!uniqueProductCodes.has(order.product_code)) {
        uniqueProductCodes.add(order.product_code);
        newProductCodesInBatch.add(order.product_code);
      }
    });

    newProductCodesInBatch.forEach((productCode) => {
      products.push({
        product_code: productCode,
      });
    });

    // insert products
    storage.bulkInsertToDB(model.product, products, (err, result) => {
      if (err) {
        insertCallback(err);
        return;
      }
      // insert orders
      storage.bulkInsertToDB(model.order, tasks, (err, result) => {
        if (err) {
          insertCallback(err);
          return;
        }
        log.info(`${result.length} records inserted in current batch.`);
        insertCount += result.length;
        insertCallback();
      });
    });
  }, process.env.BATCH_LIMIT || 10000);
  csv()
    .fromStream(file.getFileStream(options.path, options.pathType))
    .on('error', (err) => {
      callback(err);
    })
    .on('json', (json) => {
      // if the record is not correct add it to the failed list
      if (joi.validate(json, orderSchema).error) {
        failedRecords.push(json);
        return;
      }
      insertHandler.push(json);
    })
    .on('done', () => { // parsing end event
      insertHandler.drain = function () {
        callback(null, {
          insertCount,
          failedRecords,
        });
      };
    });
}

module.exports = {
  processCSV,
};
