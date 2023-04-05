import request from '@/utils/request'
const api_name = '/admin/teacher'
export default {
getList() {
    return request({
    url: api_name+'/findAll',
    method: 'get'
     })
    },
}