
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
        const isEndParam = req.originalUrl.replace(/[#|\?].*/, '').endsWith('/');
        const isEndIndex = req.originalUrl.replace(/[#|\?].*/, '').endsWith('index.html');
        if (req.headers?.accept.indexOf('html') !== -1 && (isEndParam || isEndIndex)) {
          const originalUrl = req.originalUrl.replace(/[#|\?].*/, '');
          const path = originalUrl.substr(0, originalUrl.length - (isEndParam ? 1 : 11)) + '.html';
          req.originalUrl = path;
          return req.originalUrl;
        }
      }
    }
  }
}
