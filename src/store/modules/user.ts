// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 引入登录接口
import { reqLogin } from '@/api/user'
// 引入数据类型
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
// 引入操作本地存储的工具方法
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), // 用户唯一标识
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
  },
  getters: {},
})
// 对外暴露获取小仓库方法
export default useUserStore
