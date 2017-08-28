'use strict';
const request = require('request');
const fs = require('fs');
/**
 * [Gets the readable stream based on the pathType.]
 * @param  {string} path [can be a url or a local path to a file]
 * @param  {string} type [type of the the path can either be 'url' or 'local']
 * @return {object}      [Readable Stream]
 */
function getFileStream (path, type) {
  if (!type) {
    throw new Error('UNDEFINED PATH TYPE');
  }
  if (type === 'url') {
    return request.get(path);
  }
  if (type === 'local') {
    return fs.createReadStream(path);
  }
  throw new Error('TYPE NOT SUPPORTED');
}

module.exports = {
  getFileStream,
};
