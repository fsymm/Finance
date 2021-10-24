module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target:"http://121.89.233.78:8080",
                changeOrigin: true,
                ws: true,    //web sockets
                secure: true,//http请求模式
                pathRewrite: {
                    "^/api": ""
                }
            }
        }
    }
}