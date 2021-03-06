/* eslint-disable */
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import Element from 'element-ui'
import '../static/iconfont/iconfont.css'
// import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import './mock' // simulation data

import * as filters from './filters' // global filters

Vue.prototype.$http = axios
// Vue.use(Element, {
//   size: 'medium' // set element-ui default size
// })

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// 全局组件
import './components/install'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
