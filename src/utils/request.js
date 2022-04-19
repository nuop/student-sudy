import axios from 'axios'
import store from '@/store'
import router from '@/router'

const request = axios.create({
  baseURL: 'http://edufront.lagounews.com'
})

// 设置请求拦截器，进行接口鉴权
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 封装函数用于跳转登录页
function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

// 标记token刷新状态
let isRefreshing = false
// 存储刷新时等待的请求
let requests = []

// 响应拦截器
request.interceptors.response.use(response => {
  return response
  // 错误处理
}, async error => {
  if (error.response) {
    if (error.response.status === 401) {
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      //  发送请求前检测，是否已经存在刷新 token 的请求了
      if (isRefreshing) {
        return requests.push(() => {
          request(error.config)
        })
      }
      isRefreshing = true
      // 这里是存在登录信息，发送请求，尝试刷新token
      const { data } = await request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: new window.URLSearchParams({
          refreshtoken: store.state.user.refresh_token
        }).toString()
      })
      if (data.state !== 1) {
        store.commit('setUser', null)
        redirectLogin()
        return Promise.reject(error)
      }
      // 刷新token成功
      store.commit('setUser', data.content)
      // 重新发送所有的挂起请求 requests
      requests.forEach(callback => callback())
      requests = []
      isRefreshing = false
      return request(error.config)
    }
  }
  return Promise.reject(error)
})

export default request
