// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin, reqUserInfo } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入路由(常量路由)
import { constantRouter } from '@/router/router'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
      menuRoutes: constantRouter, // 仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
    }
  },
  // 异步|逻辑地方
  actions: {
    // 用户登录的方法
    async userLogin(data: loginForm) {
      // 登录请求
      let result: loginResponseData = await reqLogin(data)
      // 登录请求：成功200 -> token
      // 登录请求：失败201 -> 登录失败错误信息
      if (result.code == 200) {
        // pinia仓库存储一下token
        this.token = result.data.token as string
        // 本地存储持久化存储一份
        SET_TOKEN(result.data.token as string)
        // 保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息进行存储仓库当中[用户头像、名字]
      let result = await reqUserInfo()
      // 如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
      } else {
      }
    },
  },
  getters: {},
})
// 对外暴露获取小仓库方法
export default useUserStore
