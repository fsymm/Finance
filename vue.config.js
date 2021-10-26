module.exports = {
    devServer: {
        proxy: { // 配置跨域
            '/api': {
                target: 'http://121.89.233.78:8080', //源地址
                changeOrigin: true, //改变源(跨域)
                ws: true,       //是否代理web sockets
                secure: true,   //http 请求模式
                pathRewrite: {  //如果接口地址以api前缀开始 打开即可
                    '^/api': ''
                }
            }
        },
    }
}