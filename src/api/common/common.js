import request from '@/utils/request'

// 上传接口
export function uploadFile(param) {
  return request({ // 用axios发送post请求
    url: '/file/upload', // 请求地址
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: param
  })
}
