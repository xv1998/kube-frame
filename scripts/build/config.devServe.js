
module.exports = {
  publicPath: '/projects/',
  hot: true,
  port: 8086,
  compress: true,
  disableHostCheck: true, // 禁用 host 检查
  stats: 'minimal',
  proxy: {
    '/projects/': {
      // 格式化请求地址
      bypass: function (req) {
        const rawUrl = req.originalUrl.replace(/[#|\?].*/, '')
        const isEndParam = rawUrl.endsWith('/');
        const isEndIndex = rawUrl.endsWith('index.html');
        const isEndRouter = rawUrl.match(/\//g).length > 2;
        if (req.headers?.accept.indexOf('html') !== -1 && (isEndParam || isEndIndex || isEndRouter)) {
          const index = rawUrl.slice(1).lastIndexOf('/');
          const path = rawUrl.substr(0, index + 1) + '.html';
          req.originalUrl = path;
          return req.originalUrl;
        }
      }
    }
  }
}
