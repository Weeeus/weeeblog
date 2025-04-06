// vue-cli的配置文件
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://47.121.190.84"
      },
      "/static": {
        target: "http://47.121.190.84"
      }
    },
  },
  configureWebpack: {
    ...require("./webpack.config"),
    performance: {
      hints: false, // 关闭资源大小警告
      maxAssetSize: 3000000, // 将单个资源大小限制设置为 3MB
      maxEntrypointSize: 5000000 // 将入口资源大小限制设置为 5MB
    }
  },
  css: {
    extract: {
      ignoreOrder: true
    }
  }
};

