const webpack = require('webpack')
module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  assetsDir:'static',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8888,
    open:true,
    host:'localhost',
    // proxy: {// 设置代理
    //   'api':{
    //     target: 'http://localhost:8888',
    //     changeOrigin: true,
    //     pathRewrite: {
    //         '^/api': ''
    //     }
    //   }
    // }
  },
  // plugins:[
  //   new webpack.ProgressPlugin({
  //     $:'jquery',
  //     jQuery:'jquery',
  //     // 'window.jQuery': 'jquery',
  //     // Popper: ['popper.js', 'default']
  //   })

  // ],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  }
}
