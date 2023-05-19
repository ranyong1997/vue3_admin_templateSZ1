// 创建用户相关的小仓库
import { defineStore } from 'pinia'
// 创建用户小仓库
const useUserStore = defineStore('User', {
  // 小仓库存储数据地方
  state: () => {
    return {}
  },
  // 异步|逻辑地方
  actions: {},
  getters: {},
})
// 对外暴露获取小仓库方法
export default useUserStore
