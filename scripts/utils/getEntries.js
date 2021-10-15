const fs = require('fs');
const glob = require('glob');
const { pathResolve, exist, stat } = require('./index');

module.exports = (dir) => {
  // 获取目录下的制定文件
  return glob.sync(dir).reduce((ob, curr)=>{
  let configPath = curr+'/config.js';
    try{
      stat(configPath);
    }catch(e){
      return ob;
    }
    if(exist(configPath)){
      const conf = require(pathResolve(configPath));
      const app = curr.split('/').pop();
      const entryFile = exist(curr + '/index.tsx') ? '/index.tsx' : '/index.js'
      ob[app] = {
        filename: `${app}.html`,
        title: conf.title,
        projectPath: curr,
        entry: pathResolve(curr + entryFile),
        template: pathResolve(curr+ '/index.html')
      }
    }
    return ob;
  },{})
}