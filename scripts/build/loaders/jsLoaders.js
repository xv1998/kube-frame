const { pathResolve } = require('../../utils');

module.exports = function jsLoader(project){
  return [
    { 
      test: /\.tsx?$/, 
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          // 关闭类型检查，即只进行转译 
          // 类型检查交给 fork-ts-checker-webpack-plugin 在别的的线程中做
          options: {
            transpileOnly: true,                            
          }
        },
      ],
    },
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
  ]
}