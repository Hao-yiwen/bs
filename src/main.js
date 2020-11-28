import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

// 导入已配置好的依赖 axios
import './network/axios'

// 树形组件
import TreeTable from "vue-table-with-tree-grid"
Vue.component('tree-table',TreeTable)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
