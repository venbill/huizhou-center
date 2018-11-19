import request from '@/utils/request'

export function getUserList(params) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params
    })
}


export function getUserDetail(id) {
    return request({
        url: '/system/user/detail/' + id,
        method: 'get'
    })
}