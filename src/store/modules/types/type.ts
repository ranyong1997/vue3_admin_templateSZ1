import type { RouteRecordRaw } from 'vue-router'
// 定义小仓库state类型
export interface UserState {
  token: null | string
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}
