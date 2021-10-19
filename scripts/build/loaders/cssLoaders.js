const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { isProd } = require('../../utils');

module.exports = function cssLoader(){
  const cssBaseLoader = [
    {
      loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      options: isProd
        ? {
            publicPath:'../',
          }
        : {},
    },
    'css-loader'
  ]
  return [
    {
      test: /\.(css)$/,
      use: [...cssBaseLoader],
    },
    {
      test: /\.(less)$/,
      use: [
        ...cssBaseLoader,
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ],
    },
  ]
}