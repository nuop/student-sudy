import Vue from 'vue'
import VueRouter from 'vue-router'
import Course from '@/views/course'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */'@/views/login')
  },
  {
    path: '/',
    name: 'course',
    component: Course
  },
  {
    path: '/course-info/:courseId',
    name: 'course-info',
    component: () => import(/* webpackChunkName: "course-info" */ '@/views/course-info'),
    props: true
  },
  {
    path: '/lesson-video/:lessonId',
    name: 'lesson-video',
    component: () => import(/* webpackChunkName: "lesson-video" */ '@/views/course-info/video'),
    props: true
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user'),
    meta: { requireAuth: true }
  },
  {
    path: '/learn',
    name: 'learn',
    component: () => import(/* webpackChunkName: "learn" */ '@/views/learn'),
    meta: { requireAuth: true }

  },
  {
    path: '/pay/:courseId',
    name: 'pay',
    component: () => import(/* webpackChunkName: "pay" */ '@/views/pay'),
    meta: { requireAuth: true },
    props: true
  },
  {
    path: '/*',
    name: 'error-page',
    component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page')
  }
]

const router = new VueRouter({
  routes
})
// 导航守卫进行登录检测与跳转
router.beforeEach((to, from, next) => {
  // 验证 to 路由是否需要进行身份认证
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 验证 Vuex 的 store 中的登录用户信息是否存储
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
    next()
  } else {
    next()
  }
})
export default router
