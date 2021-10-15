const { pathResolve } = require('../utils');
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
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM"
    },
  }
}