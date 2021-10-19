const webpack = require('webpack');
const { pathResolve } = require('../utils');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const commonConfig = require('./config.common');
const devConfig = {
  mode: "development",
  output: {
    path: pathResolve('./dist'), // build产物路径
    publicPath: '/projects/', // dev下是内存代码的地址，pro下是线上资源地址
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js', // demand-loaded filename
  },
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        BASE_URL: '"/'
      },
      __PROD__: 'false',
      __DEV__: 'true',
      __TEST__: 'false',
      __RN__: 'false'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
      },
      async: false
    }),
    new ESLintPlugin()
  ]
}

module.exports = merge(commonConfig(), devConfig);