const fs = require('fs');
const {TipsLog, Log } = require('./log');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
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

const read = (path) => {
  return fs.readFileSync(path, {encoding: 'utf8'})
}

const copy = (des, src) => {
  fs.writeFileSync(des, read(src));
}

module.exports = {
  isProd,
  isDev,
  isTest,
  pathResolve,
  exist,
  read,
  copy,
  stat,
  TipsLog,
  Log
}