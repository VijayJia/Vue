module.exports = {
    proxyList: {
        '/api/**': {
            target: 'http://localhost:8081',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}