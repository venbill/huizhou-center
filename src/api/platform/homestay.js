import request from '@/utils/request'

export function homestayList() {
  return request({
    url: '/homestay/remainder/list',
    method: 'get'
  })
}

