module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    javascriptEnabled: true
                }
            }
        }
    },
    devServer: {
        proxy: {
          // 匹配所有以/api开头的请求路径
          '/api': {
            target: 'http://127.0.0.1:8081/api',  // 转发目标地址
            changeOrigin: true,  // 允许跨域
            pathRewrite: {
              '^/api': ''  // 重写路径：去掉请求路径中的/api前缀（根据后端接口是否需要调整）
            }
          }
        },
        disableHostCheck: true
      }
}