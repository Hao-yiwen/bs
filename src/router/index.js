import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "components/Login.vue"
import Home from 'components/Home.vue'
import Welcome from "components/Welcome.vue"
import Users from "components/user/Users.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',  
    component: Home,
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/users', component: Users }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 挂在导航守卫 
// from从哪儿来 to到哪儿去 next放行函数
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()

  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) {
    console.log('请登录');
    return next('/login')
  }

  next()
})

export default router
