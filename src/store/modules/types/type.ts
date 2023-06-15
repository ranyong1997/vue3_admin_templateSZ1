import type { RouteRecordRaw } from 'vue-router'
import type { CategoryOjb } from '@/api/product/attr/type'
// 定义小仓库state类型
export interface UserState {
  token: null | string
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

// 定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Id: string | number,
  c1Arr: CategoryOjb[]
}