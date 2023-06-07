<template>
  <div>
    <el-card class="box-card">
      <!-- 卡片顶部添加品牌按钮 -->
      <el-button type="primary" icon="Plus" @click="addTrademark">
        添加品牌
      </el-button>
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
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateTrademark"
            ></el-button>
            <el-button type="danger" size="small" icon="Delete"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="getHasTrademark"
        :page-count="8"
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper, ->, sizes, total,"
        :total="total"
      />
    </el-card>
    <!-- 对话框组件：在添加品牌与修改已有品牌的业务时候使用结构 -->
    <!-- 
      v-model：属性用户控制对话框的显示与隐藏 true显示 false隐藏
      title:设置对话框左上角标题
    -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 80%">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input
            placeholder="请您输入品牌名称"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽：footer -->
      <template #footer>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// 引入组合式API函数ref
import { ref, onMounted, reactive } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from '@/api/product/trademark'
import type {
  Records,
  TradeMarkResponseData,
  TradeMark,
} from '@/api/product/trademark/type'
import { ElMessage, UploadProps } from 'element-plus'
// 当前页码
let pageNo = ref<number>(1)
// 每一页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌数据总数
let total = ref<number>(0)
// 存储已有品牌的数据
let trademarkArr = ref<Records>([])
// 控制对话框显示与隐藏
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: '',
})
// 获取已有品牌的接口封装为一个函数
const getHasTrademark = async (pager = 1) => {
  // 当前页码
  pageNo.value = pager
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
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
// 当下拉菜单发生变化的时候，会触发此方法
// 这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  getHasTrademark()
}
// 添加品牌按钮的回调
const addTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
  // 清空手机数据
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
}
// 修改已有品牌的按钮的回调
const updateTrademark = () => {
  // 对话框显示
  dialogFormVisible.value = true
}
// 对话框底部取消按钮
const cancel = () => {
  // 对话框隐藏
  dialogFormVisible.value = false
}
// 对话框底部确认按钮
const confirm = async () => {
  let result: any = await reqAddOrUpdateTrademark(trademarkParams)
  // 添加品牌成功
  if (result.code == 200) {
    // 关闭对话框
    dialogFormVisible.value = false
    // 弹出提示信息
    ElMessage({
      type: 'success',
      message: '添加品牌成功',
    })
    // 再次发请求获取已有全部的品牌树
    getHasTrademark()
  } else {
    // 添加品牌失败
    ElMessage({
      type: 'error',
      message: '添加品牌失败',
    })
    // 关闭对话框
    dialogFormVisible.value = false
  }
}
// 上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必是PNG、JPG、GIF格式',
    })
    return false
  }
}
// 图片上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  // response:即为当前这次上传图片post请求服务器返回的数据
  // 收集上传图片的地址，添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
