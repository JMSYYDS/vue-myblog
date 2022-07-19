import Vue from 'vue'
import App from './App.vue'

// 导入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入router模块
import router from '@/router/index.js'

// 引入store
import store from './store' 
import axios from 'axios'

Vue.config.productionTip = false

// 使用插件
Vue.use(ElementUI);
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  store,
  // 挂载路由实例对象
  router
}).$mount('#app')
