import axios from 'axios'
import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

Vue.component(Message, Message)

Vue.component(MessageBox, MessageBox)

console.log(Message)
console.log(MessageBox)

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // 标记来自web的请求
  config.headers['From'] = 'web'
  if (store.getters.token) {
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = store.getters.token
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  // response => response,
  /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
  response => {
    const res = response.data

    if (res.code !== 200) {
      Vue.prototype.$message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      // 400非法请求  401未授权
      if (res.code === 400 || res.code === 401) {
        console.log('----->401 登出')
        // 请自行在引入 MessageBox
        // import { Message, MessageBox } from 'element-ui'
        Vue.prototype.$msgbox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
