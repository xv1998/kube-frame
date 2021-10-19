const { isProd } = require('../../utils');
const PUBLIC_WEB_PATH = './'
module.exports = function fileLoader (project = '') {
  const version = process.env.ver;
  const filePageOption = isProd
    ? {
        esModule: false,
        limit: 10000,
        outputPath: `web/${project}/`,
        name: `[name]-${version}.[ext]?max_age=31460000`,
        publicPath: `${PUBLIC_WEB_PATH}web/${project}`,
      }
    : {
        esModule: false,
        limit: 10000,
        outputPath: './',
        name: '[name]-[hash:4].[ext]',
      };
  return [
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: filePageOption,
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: filePageOption,
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: filePageOption,
    },
  ];
};
