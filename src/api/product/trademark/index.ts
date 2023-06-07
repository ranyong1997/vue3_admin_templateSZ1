// 书写品牌管理模块接口
import request from '@/utils/request'
import type { TradeMarkResponseData, TradeMark } from './type'
// 品牌管理模块接口地址
enum API {
  // 获取已有的品牌接口
  TRADEMAEK_URL = '/admin/product/baseTrademark/',
  // 添加品牌
  ADDTRADEMAEK_URL = '/admin/product/baseTrademark/save',
  // 修改已有品牌
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update'
}
// 获取已有平拍的接口方法
// page:获取第几页 -- 默认第一页
// limit:获取几个已有品牌的数据
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(
    API.TRADEMAEK_URL + `${page}/${limit}`,
  )

// 添加与修改已有品牌接口方法
export const reqAddOrUpdateTrademark = (data: TradeMark) => {
  // 修改已有品牌的数据
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL)
  } else {
    // 新增品牌
    return request.post<any, any>(API.ADDTRADEMAEK_URL, data)
  }
}