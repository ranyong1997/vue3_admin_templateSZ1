// 路由鉴权，项目当中路由能不能被访问(某一个路由什么条件下可以访问，什么条件下不可以访问)
import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
// 引入settings文件
import setting from './setting'
// 引入进度条样式
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
// 引入大仓库
import pinia from './store/'
// 获取用户相关的小仓库内部token数据，去判断用户是否登录成功
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)
// 全局守卫：项目当中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // to:你将要访问的那个路由
  // from:你从那个路由而来
  // next:路由放行函数
  nprogress.start()
  // 获取token，去判断用户登录、还是未登录
  let token = userStore.token
  // 获取用户名字
  let username = userStore.username
  // 用户登录判断
  if (token) {
    // 登录成功，访问login，不能访问，指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 登录成功访问其余接口
      // 有用户信息
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
        try {
          await userStore.userInfo()
          // 放行
          next()
        } catch (error) {
          // token过期：获取不到用户信息了
          // 用户手动修改本地存储token
          // 退出登录->用户相关数据清空
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录判断
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  // 增加tab页跳转标题
  document.title = `${setting.title} - ${to.meta.title}`
  nprogress.done()
})
