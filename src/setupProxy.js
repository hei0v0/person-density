const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:4500/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        })
    )
}
