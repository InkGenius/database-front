// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import routes from './routers'
import store from './vuex/controller'
var VueCookie = require('vue-cookie')
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueRouter)

// 创建router实例
const router = new VueRouter({
  mode: 'history',
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
