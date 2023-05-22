<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
// 收集账号与密码的数据
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// 引入element-plus中ElNotification
import { ElNotification } from 'element-plus'
// 引入用户相关的小仓库
import userUserStore from '@/store/modules/user'
// 引入获取当前时间的函数
import { getTime } from '@/utils/time'
// 定义变量控制按钮加载效果
let loading = ref(false)
let useStore = userUserStore()
// 获取el-form组件
let loginForms = ref()
// 获取路径
let $router = useRouter()
// 收集账号与密码的数据
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
// 登录按钮回调
const login = async () => {
  // 保证全部表单校验通过再发起请求
  await loginForms.value.validate()
  // 开始加载
  loading.value = true
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    //  编程式导航跳转到展示数据首页
    $router.push('/')
    // 登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好!`,
    })
    // 登录成功加载效果也消失
    loading.value = false
  } catch (error) {
    // 登录失败加载效果消失
    loading.value = false
    // 登录失败提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
// 自定义校验规则
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule:即为校验规则对象
  // value:即为表单元素文本内容
  // callback：是一个函数，如果符合条件，callback放行通过；不符合，则注入错误提示信息
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少为5位'))
  }
}
const validatorPassWord = (rule: any, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少为6位'))
  }
}
// 定义表单校验需要配置对象
const rules = {
  // 规则对象属性：
  // required:代表这个字段务必要校验的
  // min:文本长度至少多少位
  // max：文本长度最多多少位
  // message:错误的提示信息
  // trigger:触发校验表单的时机，change->文本发生变化触发校验,blur->失去焦点额时候触发校验规则
  username: [
    // { required: true, min: 5, max: 10, message: '账号长度至少5位', trigger: 'change' },
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' },
    { trigger: 'change', validator: validatorPassWord }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  widows: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;

  h1 {
    color: white;
    font-size: 40px;
  }

  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
