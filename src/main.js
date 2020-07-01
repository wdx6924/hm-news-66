import Vue from 'vue'
import App from './App.vue'
import { Button } from 'vant'
import 'amfe-flexible'
import './style/common.less'
import './style/iconfont.css'
import router from './router/router.js'

Vue.config.productionTip = false
Vue.use(Button)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
