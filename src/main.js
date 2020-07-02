import Vue from 'vue'
import App from './App.vue'
import { Button, Field, Form, Toast } from 'vant'
import 'amfe-flexible'
import './style/common.less'
import './style/iconfont.css'
import router from './router/router.js'
import hmHeader from './components/hmHeader.vue'
import hmLogo from './components/hmLogo.vue'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Form)
Vue.use(Field)
Vue.use(Toast)

Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)

new Vue({
  render: h => h(App),
  router

}).$mount('#app')
