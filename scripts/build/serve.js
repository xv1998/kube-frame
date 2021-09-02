const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevServe = require('webpack-dev-server');
const EntryPlugin = require("webpack/lib/EntryPlugin");
const devConfig = require('./config.dev');
const { Log, pathResolve } = require('../utils');
const devServerConfig = require('./config.devServe');
const getPageEntries = require('../utils/getEntries')
let entries = getPageEntries('projects/*');
let entryNames = Object.keys(entries);
let buildNewEntry = false;
let hotEntry = []; // 动态入口
const buildedSet = new Set(); // 记录构建项目，避免重复构建
const log = new Log();

const getHTMLPlugin = app => {
  return new HtmlWebpackPlugin({
    title: entries[app].title,
    filename: entries[app].filename,
    template: entries[app].template,
    inject: true,
    chunks: [app],
    app
  })
}

const handleMulitEntry = (app, _paths, compiler) => {
  const path = hotEntry.concat([_paths]);
  for (const entry of path) {
    new EntryPlugin(process.cwd(), entry, app).apply(compiler);
  }
  compiler.hooks.compile.tap('updateHTML', () => {
    getHTMLPlugin(app).apply(compiler);
    compiler.hooks.initialize.call();
  })
}

const initDevConfigration = () => {
  hotEntry = [require.resolve('webpack/hot/dev-server')];
  const page404 = hotEntry.concat([entries['404'].entry]);
  // 默认构建 404 页面
  devConfig.entry = {
    404: page404
  }
  devConfig.plugins.unshift(getHTMLPlugin('404'));
  return devConfig;
}

/**
 * 热更新检查
 * @param {*} server 
 * @param {*} compiler 
 * @param {*} devServerOption 
 */
const hotReload = (server, compiler, devServerOption) => {
  let hot = false;
  let initial = false;

  compiler.hooks.compile.tap('hot',()=>{
    if(!buildNewEntry){
      hot = true;
    }
    log.ln().yellow('热更新');
  })
  
  compiler.hooks.afterEmit.tap('done',()=>{
    log.ln().yellow('编译结束');
    if(!initial){
      initial = true;
      server.listen(devServerOption.port, 'localhost', ()=>{
        log.ln().green(`项目已启动，端口 ${devServerOption.port}`)
      })
    }else {
      if(hot){
        hot = false;
      }else {
        buildNewEntry = false;
      }
    }
  })
}

/**
 * 监听 html 页面
 */
const listenHtml = (server, compiler) => {
  server.app.get('/*.html', (req, res, next) => {
    const matched = req.originalUrl.match(/\/projects\/(.*)\.html/);
    if(matched) {
      let [_, app] = matched;
      // 如果在 entryNames 找不到，则认为是新建项目
      if(!entryNames.includes(app)){
        entries = getPageEntries('projects/*');
        entryNames = Object.keys(entries);
      }
      if(entryNames.includes(app)){
        if(!buildedSet.has(app)){
          buildNewEntry = true;
          log.ln().blue(`构建新入口${app}`);
          handleMulitEntry(app, entries[app].entry, compiler);
            // 重新构建，使原先的 bundle 失效
          server.middleware.invalidate();
          // 构建完成回调
          server.middleware.waitUntilValid(() => {
            // 记录构建项目
            buildedSet.add(app);
            log.ln().green(`构建成功${app}`);
            // 编译器输出页面到浏览器
            compiler.outputFileSystem.readFile(
              pathResolve(compiler.outputPath + `/${app}.html`),
              function(err, result){
                if(err){
                  return next(err);
                }
                res.set('content-type', 'text/html');
                res.send(result);
                res.end();
              }
            )
          })
        }
      }else {
        res.redirect('/projects/404.html');
      }
    }
  })
}

const run = () => {
  const compiler = webpack(initDevConfigration());
  const server = new webpackDevServe(compiler, {
    ...devServerConfig
  });
  hotReload(server, compiler, devServerConfig);
  listenHtml(server,compiler)
}
run();