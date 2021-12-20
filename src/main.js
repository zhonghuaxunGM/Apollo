import Vue from 'vue'
import App from './App.vue'

import './core/use'
import Storage from 'vue-ls'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.use(Storage, { storage: 'local' })