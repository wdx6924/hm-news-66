module.exports = {
  devServer: {
    open: true
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:3000',
    //     pathRewrite: { '^/api': '' },
    //     secure: true,
    //     // 如果设置成true：发送请求头中host会设置成target·
    //     changeOrigin: true
    //   }
    // }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      moment: 'moment',
      axios: 'axios',
      lodash: '_'
    }
  }
}
