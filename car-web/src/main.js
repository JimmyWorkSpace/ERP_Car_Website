import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'  // 引入路由实例
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)
Vue.config.productionTip = false

new Vue({
  router,  // 挂载路由
  render: h => h(App)
}).$mount('#app')
