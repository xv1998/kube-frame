const webpack = require('webpack');
const { pathResolve } = require('../utils');
const { merge } = require('webpack-merge');
const commonConfig = require('./config.common');

const devConfig = {
  mode: "development",
  output: {
    path: pathResolve('./dist'),
    publicPath: '/projects/',
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
    new webpack.ProgressPlugin()
  ]
}

module.exports = merge(commonConfig(), devConfig);