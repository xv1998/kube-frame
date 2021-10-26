const { pathResolve } = require('../utils');
const getPageEntries = require('../utils/getEntries');
const cssLoader = require('./loaders/cssLoaders');
const fileLoader = require('./loaders/fileLoaders');
const jsLoader = require('./loaders/jsLoaders');
const entries = getPageEntries('projects/*');
module.exports = (project = '') => {
  const aliasProject = {};
  Object.keys(entries).forEach(item => {
    aliasProject[`@${item}`] = pathResolve(`./${entries[item].projectPath}`)
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
        ...jsLoader(project),
        ...cssLoader(project),
        ...fileLoader(project)
      ],
    }
  }
}