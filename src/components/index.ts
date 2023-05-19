// 引入项目中全局的组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
// 全局组件
const allGloablComponent: any = { SvgIcon, Pagination }
// 对外暴漏对象
export default {
  // 务必叫做install方法
  install(app: any) {
    // 注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGloablComponent[key])
    })
  },
}