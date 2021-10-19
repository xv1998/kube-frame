const { pathResolve } = require('../utils');
const cssLoader = require('./loaders/cssLoaders');
const fileLoader = require('./loaders/fileLoaders');
const getPageEntries = require('../utils/getEntries');
const entries = getPageEntries('projects/*');
module.exports = (project = '') => {
  const aliasProject = {};
  Object.keys(entries).forEach(item => {
    aliasProject[`@${item}`] = pathResolve(`./${entries[item].projectPath}/src`)
  })
  return {
    context: pathResolve('.'),
    output: {
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js','ts','.json','.jsx','.tsx'],
      alias: Object.assign({
        '@': pathResolve('./'),
        '~': pathResolve('./'),
      }, aliasProject)
    },
    module: {
      rules: [
        // { 
        //   test: /\.tsx?$/, 
        //   use: [
        //     'babel-loader',
        //     {
        //       loader: 'ts-loader',
        //       // 关闭类型检查，即只进行转译 
        //       // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
        //       options: {
        //         transpileOnly: true,                            
        //       }
        //     },
        //   ],
        // },
        { 
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          include: [ pathResolve('./projects/')],
          use: [{
            loader: 'babel-loader',
            options: {
              // 本地缓存babel编译的文件，提升速度
              cacheDirectory: '.cache/babel'
            }
          }]
        },
        ...cssLoader(project),
        ...fileLoader(project)
      ],
    }
  }
}