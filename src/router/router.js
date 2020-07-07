import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import user from '../views/user.vue'
import userEdit from '../views/userEdit.vue'
import myFollow from '../views/myFollow.vue'
import myComments from '../views/myComments.vue'
import mystar from '../views/mystar.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: user, name: 'user' },
    { path: '/user-edit', component: userEdit, name: 'userEdit' },
    { path: '/my-follow', component: myFollow },
    { path: '/my-comments', component: myComments },
    { path: '/my-star', component: mystar }
  ]
})
const pages = ['/user', '/user-edit']
// 前置导航守卫，判断是否有token
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (pages.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
