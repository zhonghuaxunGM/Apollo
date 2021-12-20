const assetsCDN = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'axios': 'axios'
  },
  css: [],
  js: []
}

const vueConfig = {
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = assetsCDN
      return args
    })
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // custom theme
        },
        javascriptEnabled: true
      }
    }
  },

  devServer: {
    // port:8080,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    watchOptions: { ignored: /node_modules/ },
    proxy: {
      '/service-t-k8s': {
        target: 'http://127.0.0.1:7799/service-t-k8s',
        ws: false,
        changeOrigin: true
      }
    }
  }
}

module.exports = vueConfig
