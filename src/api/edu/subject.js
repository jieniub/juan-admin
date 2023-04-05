import request from '@/utils/request'
const api_name = 'admin/subject'
export default {
    saveCourseInfo(courseInfo) {
        return request({
            url: `${api_name}/getSubject`,
            method: 'post',
            data: courseInfo
        })
    },
    getNestedTreeList() {
        return request({
            url: `${api_name}/getSubject`,
            method: 'get'
        })
    }
}