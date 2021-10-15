const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const { pathResolve, TipsLog } = require('../../utils/index');
const log = new TipsLog();

function fillProjectName(file, name){
  try{
    let content = fs.readFileSync(file, {encoding: 'utf-8'});
    content = content.replace(/%system_name%/g, name);
    fs.writeFileSync(file, content);
  }catch(e){
    log.error('重命名组件失败');
  }
}

module.exports = function init(projectName, type) {
  const projectPath = pathResolve('./projects/' + projectName);
  const demoPath = path.resolve(__dirname, '../../demo/demo-'+ type);
  fs.stat(projectPath, function(err) {
    if(err) {
      ncp(demoPath, projectPath, function(err){
        if(err){
          log.error('Create Error: ncp get wrong');
          log.error(err);
        }else {
          fillProjectName(path.resolve(projectPath, './index.html'), projectName);
          fillProjectName(path.resolve(projectPath, './config.js'), projectName);
          log.success(`Project ${projectName} create successfully!!`)
        }
      })
    }else {
      log.error(`${projectName} already existed`);
    }
  })
}