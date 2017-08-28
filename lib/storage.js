'use strict';

/**
 * [a wrapper for sequelize's bulkCreate]
 * @param  {object}   model    [sequelize model where data needs to be saved]
 * @param  {array}   records   [array of records to save]
 * @param  {Function} callback [function to call once data has been written successfully]
 */
function bulkInsertToDB (model, records, callback) {
  // do not attemp to insert if there is no record
  if (!records || records.length === 0) {
    callback(null, []);
    return;
  }
  model.bulkCreate(records, {
    ignoreDuplicates: true,
  }).then(function (result) {
    callback(null, result);
  }).catch((err) => {
    callback(err);
  });
}

module.exports = {
  bulkInsertToDB,
};
