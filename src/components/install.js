// 组件全局注册
import Vue from 'vue'

import PageTable from './pageTable'

// 形成组件库
const components = [
  PageTable
]

// 注册全局组件
components.map((com) => {
  Vue.use(com)
  // Vue.component(com.name, com)
})

export default components
