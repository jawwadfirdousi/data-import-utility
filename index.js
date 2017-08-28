require('dotenv').config();
// const file = require('./lib/import-file');
const data = require('./lib/data');
const log = require('bunyan').createLogger({name: 'data-import'});
const db = require('./core/database/index');

// a self executing function. To be called as soon as the module is called.
(() => {
  db.sequelize.sync().then(() => {
    // stop watch start
    console.time('db-save');
    const options = {
      path: process.env.FILE_URL,
      pathType: 'url',
    };
    data.processCSV(db, options, (err, result) => {
      if (err) {
        log.error(err);
        return;
      }
      // stop watch end
      console.timeEnd('db-save');
      log.warn(result.failedRecords);
      log.info(`TOTAL INSERTED RECORDS: ${result.insertCount}`);
      // queue db close at the end of the event loop
      setImmediate(() => {
        db.sequelize.close();
      });
    });
  }).catch((err) => {
    log.error(err);
  });
})();
