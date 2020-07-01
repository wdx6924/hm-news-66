import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register }
  ]
})
export default router
