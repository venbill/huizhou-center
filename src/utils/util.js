import Vue from 'vue'

var DEFAULT_PATTERN = 'yyyy-MM-dd'
var SIGN_REGEXP = /([yMdhsm])(\1*)/g

function padding(s, len) {
  len = len - (s + '').length
  for (var i = 0; i < len; i++) { s = '0' + s }
  return s
}

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
  },

  // 设置cookie
  setCookie(name, value) {
    document.cookie = name + '=' + escape(value)
  },

  // 获取cookie
  getCookie(name) {
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    const arr = document.cookie.match(reg)
    if (arr) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  // 清除cookie
  clearCookie(name) {
    this.setCookie(name, '', -1)
  },

  // 数组等分
  chunk: function(arr, size) {
    var arr2 = []
    for (var i = 0; i < arr.length; i = i + size) {
      arr2.push(arr.slice(i, i + size))
    }
    return arr2
  },

  // 金额加工
  pieceFormat(val) {
    return '￥' + val
  },
  // 加法计算
  numberAdd() {
    const len = arguments.length // 参数个数
    let number = 0 // 总和
    for (let i = 0; i < len; i++) { // 遍历所有参数
      if (typeof (arguments[i]) === 'number') { // number类型，不操作

      } else if (typeof (arguments[i]) === 'string') { // 字符串类型转成numbrt类型
        arguments[i] = Number(arguments[i])
      } else { // 其他类型默认为0
        arguments[i] = 0
      }
      if (isNaN(arguments[i])) {
        arguments[i] = 0
      }
      number += arguments[i] * 10000 // 先把数字扩大10000倍，再计算总和
    }
    number = number / 10000 // 计算结果缩小10000倍
    return number // 返回计算结果
  },
  // 对象深拷贝
  arrDeepCopy(arr) {
    const newArr = JSON.parse(JSON.stringify(Object.assign({}, arr)))
    return newArr
  },
  // 对象处理方法
  formatDate: {
    format: function(date, pattern) {
      pattern = pattern || DEFAULT_PATTERN
      return pattern.replace(SIGN_REGEXP, function($0) {
        switch ($0.charAt(0)) {
          case 'y':
            return padding(date.getFullYear(), $0.length)
          case 'M':
            return padding(date.getMonth() + 1, $0.length)
          case 'd':
            return padding(date.getDate(), $0.length)
          case 'w':
            return date.getDay() + 1
          case 'h':
            return padding(date.getHours(), $0.length)
          case 'm':
            return padding(date.getMinutes(), $0.length)
          case 's':
            return padding(date.getSeconds(), $0.length)
        }
      })
    }
  },
  // 字符串截取
  stringSlice(string, length) {
    return string.slice(0, length)
  }
}
