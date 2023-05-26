<template>
  <el-card class="box-card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" icon="Plus">添加品牌</el-button>
    <!-- 表格组件：用于展示已有的平台数据 -->
    <el-table style="margin: 10px 0px" border :data="trademarkArr">
      <el-table-column
        label="序号"
        width="80px"
        align="center"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template #="{ row, $index }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total,"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
// 引入组合式API函数ref
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
// 当前页码
let pageNo = ref<number>(1)
// 每一页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<any>([])
// 获取已有品牌的接口封装为一个函数
const getHasTrademark = async () => {
  let result = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code == 200) {
    // 存储已有品牌总个数
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 组件挂载完毕钩子发一次请求，获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTrademark()
})
</script>

<style scoped></style>
