import Vue from 'vue'
import VueRouter from 'vue-router'

// 普通方式
// import Login from "components/Login.vue"
// import Home from 'components/Home.vue'
// import Welcome from "components/Welcome.vue"

// 懒加载: 登录——主页——欢迎页
const Login = () => import(/* webpackChunkName: "login_Home_Welcome" */ "components/Login.vue")
const Home = () => import(/* webpackChunkName: "login_Home_Welcome" */ "components/Home.vue")
const Welcome = () => import(/* webpackChunkName: "login_Home_Welcome" */ "components/Welcome.vue")

// 用户管理
const Users = () => import(/* webpackChunkName: "users" */ "components/user/Users.vue")

// 权限管理
const RightsList = () => import(/* webpackChunkName: "rights" */ "components/power/Rights.vue")
const RolesList = () => import(/* webpackChunkName: "rights" */ "components/power/Roles.vue")

// 商品管理
const Categories = () => import(/* webpackChunkName: "goods" */ "components/goods/Categories.vue")
const Params = () => import(/* webpackChunkName: "goods" */ "components/goods/Params.vue")
const List = () => import(/* webpackChunkName: "goods" */ "components/goods/List.vue")
const AddGoods = () => import(/* webpackChunkName: "goods" */ "components/goods/AddGoods.vue")

// 订单管理
const Order = () => import(/* webpackChunkName: "order_Report" */ "components/order/Order.vue")
// 数据统计
const Report = () => import(/* webpackChunkName: "order_Report" */ "components/report/Report.vue")



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
      { path: '/rights', component: RightsList },
      { path: '/roles', component: RolesList },
      { path: '/categories', component: Categories },
      { path: '/params', component: Params },
      { path: '/goods', component: List},
      { path: '/goods/add', component: AddGoods},
      { path: '/orders', component: Order},
      { path: '/reports', component: Report},
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
