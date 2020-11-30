import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "components/Login.vue"
import Home from 'components/Home.vue'
import Welcome from "components/Welcome.vue"
// 用户管理
import Users from "components/user/Users.vue"
// 权限管理
import Rights from "components/power/Rights.vue"
import Roles from "components/power/Roles.vue"
// 商品管理
import Categories from "components/goods/Categories.vue"
import Params from "components/goods/Params.vue"
import List from "components/goods/List.vue"
import AddGoods from "components/goods/AddGoods.vue"
// 订单管理
import Order from "components/order/Order.vue"


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
      { path: '/users', component: Users },
      { path: '/rights', component: Rights },
      { path: '/roles', component: Roles },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: List},
      { path: '/goods/add', component: AddGoods},
      { path: '/orders', component: Order},
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 挂载导航守卫 
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
