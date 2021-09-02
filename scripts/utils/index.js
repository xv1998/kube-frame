const fs = require('fs');
const Log = require('./log');
const path = require('path');

const pathResolve = dir => {
  if(typeof dir !== 'string') {
    return '';
  };
  if(dir.indexOf('/') === 0 || /^\w:/gi.test(dir)){
    return dir; // dir is absolute path;
  }
  return path.resolve(__dirname, '..', '..',dir);
}

module.exports = {
  pathResolve,
  Log
}