const file = require('../lib/file');

/* eslint-disable no-undef */

describe('File Readable stream', () => {
  describe('Get URL stream', () => {
    it('shoud be a request stream', () => {
      const stream = file.getFileStream('https://www.google.com', 'url');

      expect(stream.method).toBe('GET');
    });

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
