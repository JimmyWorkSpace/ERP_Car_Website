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
        historyApiFallback: true,  // 添加history模式支持
        proxy: {
          // 匹配所有以/api开头的请求路径
          '/car/api': {
            // target: 'http://nas.yanjiashuo.cn:9999/api',  // 转发目标地址
            target: 'https://sale.carce.cc/car',  // 转发目标地址
            changeOrigin: true,  // 允许跨域
            pathRewrite: {
              '^/car': ''  // 重写路径：去掉请求路径中的/api前缀（根据后端接口是否需要调整）
            }
          }
        },
        disableHostCheck: true
      }
}