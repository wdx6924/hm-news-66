import Vue from 'vue'
import App from './App.vue'
import './vant/vant.js'

import { Toast } from 'vant'
import 'amfe-flexible'
import './style/common.less'
import './style/iconfont.css'
import router from './router/router.js'
import hmHeader from './components/hmHeader.vue'
import hmLogo from './components/hmLogo.vue'
import axios from 'axios'
import hmNavbar from './components/hmNavbar.vue'
import moment from 'moment'
// axios设置
Vue.prototype.$axios = axios
// 自定义方法
Vue.prototype.$url = function(url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}
axios.defaults.baseURL = 'http://localhost:3000'
axios.interceptors.request.use(function(config) {
  // 拦截所有请求，设置token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
// 使用拦截器拦截所有token失效的响应
axios.interceptors.response.use(function(res) {
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    Toast.fail(message)
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  return res
})

Vue.config.productionTip = false
// 注册全局组件
Vue.component('hm-header', hmHeader)
Vue.component('hm-logo', hmLogo)
Vue.component('hm-navbar', hmNavbar)
// 自定义过滤器
Vue.filter('time', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

// Vue实例
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
