const fs = require('fs');
const path = require('path');
const ncp = require('ncp');
const { pathResolve, TipsLog } = require('../../utils/index');
const log = new TipsLog();

function fillProjectName(file, name){
  try{
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      let content = data.replace(/%system_name%/g, name);
      fs.writeFileSync(file, content);
    });
  }catch(e){
    log.error('重命名组件失败');
  }
}

module.exports = function init(projectName, type, options = []) {
  const projectPath = pathResolve('./projects/' + projectName);
  const demoPath = path.resolve(__dirname, '../../demo/demo-'+ type);
  const toolsPath = path.resolve(__dirname, '../../demo/base');
  fs.stat(projectPath, function(err) {
    if(err) {
      ncp(demoPath, projectPath, function(err){
        if(err){
          log.error('Create Error: ncp get wrong');
          log.error(err);
          return;
        }else {
          fillProjectName(path.resolve(projectPath, './index.html'), projectName);
          fillProjectName(path.resolve(projectPath, './config.js'), projectName);
        }
        if(options.includes('redux')){
          ncp(toolsPath + '/redux', projectPath, function(err){
            if(err){
              log.error('Create redux Error: ncp get wrong');
              log.error(err);
              return;
            }else {
              const redunFile = path.resolve(projectPath, './constants/GlobalContext.js');
              fs.stat(redunFile, function(err){
                if(!err){
                  fs.rm(redunFile, function(err){
                    if(err){
                      log.error('删除多余文件失败');
                    }
                  });
                }
              })
              fillProjectName(path.resolve(projectPath, './reducers/index.js'), projectName);
              fillProjectName(path.resolve(projectPath, './actions/index.js'), projectName);
            }
          })
        }
      })
    }else {
      log.error(`${projectName} already existed`);
    }
  })
  log.success(`Project ${projectName} create successfully!!`)
}