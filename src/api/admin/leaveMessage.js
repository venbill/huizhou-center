import request from '@/utils/request'

export function getLeaveMessageList(params) {
    return request({
        url: '/system/leaveMessage/list',
        method: 'get',
        params
    })
}

export function addLeaveMessage(params) {
    return request({
        url: '/system/leaveMessage',
        method: 'post',
        data: params
    })
}
export function deleteLeaveMessage(id) {
    return request({
        url: '/system/leaveMessage/' + id,
        method: 'delete'

    })
}
export function getLeaveMessageDetail(id) {
    return request({
        url: '/system/leaveMessage/' + id,
        method: 'get'
    })
}