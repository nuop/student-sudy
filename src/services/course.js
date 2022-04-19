import request from '@/utils/request'

// 获取广告位及其对应的广告
export const getAllAds = params => {
  return request({
    method: 'GET',
    url: '/front/ad/getAllAds',
    params
  })
}
// 获取所有课程
export const getQueryCourses = data => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 获取已购课程
export const getPurchaseCourse = () => {
  return request({
    method: 'GET',
    url: '/front/course/getPurchaseCourse'
  })
}
// 获取课程信息
export const getCourseById = params => {
  return request({
    method: 'GET',
    url: '/front/course/getCourseById',
    params
  })
}
// 获取课程章节
export const getSectionAndLesson = params => {
  return request({
    method: 'GET',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}
// 获取播放资源
export const getVideoInfo = params => {
  return request({
    methods: 'GET',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
