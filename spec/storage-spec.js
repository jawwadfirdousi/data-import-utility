const storage = require('../lib/storage');
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

describe('Data insertion', () => {
  it('should not insert any record for empty object', () => {
    storage.bulkInsertToDB(DBConnectionMock.models.product, {}, (err, result) => {
      expect(result.length).toBe(0);
    });
  });

  it('should not insert any record for null object', () => {
    storage.bulkInsertToDB(DBConnectionMock.models.product, null, (err, result) => {
      expect(result.length).toBe(0);
    });
  });

  it('should insert 2 records', () => {
    storage.bulkInsertToDB(DBConnectionMock.models.product,
      [{
        product_code: 'abc',
      },
      {
        product_code: 'def',
      }], (err, result) => {
        expect(result.length).toBe(2);
      });
  });
});

describe('thorw errors', () => {
  it('should throw undefined, model does not exist', () => {
    expect(
      function () {
        storage.bulkInsertToDB(DBConnectionMock.models.abc,
          {
            product_code: 'abc',
          }, () => {});
      }
    ).toThrow(new Error(`Cannot read property 'bulkCreate' of undefined`));
  });
});
