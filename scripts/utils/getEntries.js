const fs = require('fs');
const glob = require('glob');
const { Log, pathResolve } = require('./index');
const log = new Log();

module.exports = (dir) => {
  // 获取目录下的制定文件
  return glob.sync(dir).reduce((ob, curr)=>{
  let configPath = pathResolve(curr+'/config.js');
    try{
      fs.statSync(configPath);
    }catch(e){
      return ob;
    }
    if(fs.existsSync(configPath)){
      const conf = require(configPath);
      const app = curr.split('/').pop();
      ob[app] = {
        filename: `${app}.html`,
        title: conf.title,
        projectPath: curr,
        entry: pathResolve(curr + '/index.tsx'),
        template: pathResolve(curr+ '/index.html')
      }
    }
    return ob;
  },{})
}