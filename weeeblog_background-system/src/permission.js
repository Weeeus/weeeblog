import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false })

// const whiteList = ['/login'] // no redirect whitelist 白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()

  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  // const hasToken = getToken()

  const hasGetUserInfo = store.getters.user // 获取本地用户信息

  if (to.meta.auth) {
    // 页面需要鉴权
    if (hasGetUserInfo) {
      // 有用户信息，直接放行
      next()
    } else {
      // 没有用户信息, 是否有 token
      const hasToken = localStorage.getItem('adminToken')

      if (hasToken) {
        // 有 token，验证token 的有效性
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          Message.error('登录过期，请重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        // 没有 token，需要重新进行登录
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  } else {
    // 页面不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      // 在登录的状态下，去 login
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})

