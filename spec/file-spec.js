const file = require('../lib/file');

/* eslint-disable no-undef */

describe('Get stream for file', () => {
  describe('Get URL stream', () => {
    it('shoud be a request stream', () => {
      const stream = file.getFileStream('https://www.google.com', 'url');

      expect(stream.method).toBe('GET');
    });
    // it('should be a readable file stream', () => {
    //   const stream = file.getFileStream('../package.json', 'local');
    //   // console.log(stream);
    //
    //   stream.on('readable', (data) => {
    //     console.log('data-----------------');
    //     expect(data).toBe('abc');
    //   });
    //   stream.on('end', (err) => {
    //     console.log('data-----------------');
    //     expect(data).toBe('abc');
    //
    //     console.log(err);
    //   });
    //   stream.on('close', (err) => {
    //     console.log('data-----------------');
    //     expect(data).toBe('abc');
    //
    //     console.log(err);
    //   });
    //   stream.on('data', (err) => {
    //     console.log('data-----------------');
    //     expect(data).toBe('abc');
    //
    //     console.log(err);
    //   });
    // });
    it('should throw undefined type', () => {
      expect(
        function () {
          file.getFileStream('this param shoud not matter');
        }
      ).toThrow(new Error('UNDEFINED PATH TYPE'));
    });

    it('should throw undefined type', () => {
      expect(
        function () {
          file.getFileStream('this param shoud not matter', 'dummytype');
        }
      ).toThrow(new Error('TYPE NOT SUPPORTED'));
    });

    it('shoud throw Invalid URI', () => {
      expect(
        function () {
          file.getFileStream('www.google.com', 'url');
        }
      ).toThrow(new Error('Invalid URI "www.google.com"'));
    });
  });
});
