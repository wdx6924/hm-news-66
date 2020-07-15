import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName: "user" */ '../views/login.vue')
const Register = () =>
  import(/* webpackChunkName: "user" */ '../views/register.vue')
const user = () => import(/* webpackChunkName: "user" */ '../views/user.vue')
const userEdit = () =>
  import(/* webpackChunkName: "user" */ '../views/userEdit.vue')
const myFollow = () =>
  import(/* webpackChunkName: "user" */ '../views/myFollow.vue')
const myComments = () =>
  import(/* webpackChunkName: "user" */ '../views/myComments.vue')
const mystar = () =>
  import(/* webpackChunkName: "user" */ '../views/mystar.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const PostSearch = () =>
  import(/* webpackChunkName: "post" */ '../views/PostSearch.vue')
const Post = () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
const Manage = () =>
  import(/* webpackChunkName: "post" */ '../views/Manage.vue')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: user, name: 'user' },
    { path: '/user-edit', component: userEdit, name: 'userEdit' },
    { path: '/my-follow', component: myFollow },
    { path: '/my-comments', component: myComments },
    { path: '/my-star', component: mystar },
    { path: '/post-search', component: PostSearch },
    { path: '/post/:id', component: Post },
    { path: '/manage', component: Manage }
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
