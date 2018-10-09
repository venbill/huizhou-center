import Vue from 'vue'

export default {
  //  http请求
  httpJesen: function(url, params, callback) {
    Vue.prototype.$http.post(url, params, { headers: { 'Content-Type': 'application/json' }})
      .then(
        (response) => {
          if (response.data.status === 200) {
            callback(response.data)
          } else {
            if (response.data.status === 403) {
              return
            } else {
              Vue.prototype.$message({
                message: response.data.message,
                type: 'warning'
              })
            }
          }
        },
        (error) => {
          Vue.prototype.$message({
            message: '服务器异常',
            type: 'error'
          }, error)
        }
      )
  },
  httpJesenGet: function(url, params, callback) {
    Vue.prototype.$http.get(url, { params: params })
      .then(
        (response) => {
          if (response.data.status === 200) {
            callback(response.data)
          } else {
            if (response.data.status === 403) {
              return
            } else {
              Vue.prototype.$message({
                message: response.data.message,
                type: 'warning'
              })
            }
          }
        },
        (error) => {
          Vue.prototype.$message({
            message: '服务器异常',
            type: 'error'
          }, error)
        }
      )
  }
}
