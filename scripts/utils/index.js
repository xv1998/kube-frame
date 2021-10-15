const fs = require('fs');
const {TipsLog, Log } = require('./log');
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

const stat = (path) => {
  return fs.statSync(pathResolve(path));
};

const exist = (path) => {
  return fs.existsSync(pathResolve(path));
};

module.exports = {
  pathResolve,
  exist,
  stat,
  TipsLog,
  Log
}