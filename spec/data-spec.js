const data = require('../lib/data');
const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

/* eslint-disable no-undef, handle-callback-err */

DBConnectionMock.define('order', {
  'id': 1,
  'order_code': 'ck123',
  'client_name': 'client1',
  'product_code': 'product_code1',
  'quantity': 10,
});

DBConnectionMock.define('product', {
  'id': 1,
  'product_code': 'product_code1',
});

describe('Data processing: ', () => {
  it('should write 14 records to the DB', (done) => {
    const options = {
      path: './spec/test-data/data.csv',
      pathType: 'local',
    };
    data.processCSV(DBConnectionMock.models, options, (err, result) => {
      expect(result.insertCount).toBe(14);
      done();
    });
  }, 100000);

  it('should write 10 records to the DB and 4 failed records', (done) => {
    const options = {
      path: './spec/test-data/data-incorrect.csv',
      pathType: 'local',
    };
    data.processCSV(DBConnectionMock.models, options, (err, result) => {
      expect(result.insertCount).toBe(10);
      expect(result.failedRecords.length).toBe(4);
      done();
    });
  }, 100000);
});
