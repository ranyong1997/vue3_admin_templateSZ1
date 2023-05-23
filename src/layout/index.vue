<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider">
      <Logo></Logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu background-color="#001529" text-color="white">
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部菜单 -->
    <div class="layout_tabbar">2</div>
    <!-- 内容展示区域 -->
    <div class="layout_main">3</div>
  </div>
</template>

<script setup lang="ts">
// 引入左侧菜单logo子组件
import Logo from './logo/index.vue'
// 引入菜单组件
import Menu from './menu/index.vue'
// 获取用户相关的小仓库
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base_menu_widht;
    height: 100vh;
    background: $base_menu_backgroud;

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base_menu_logo_height);

      .el-menu {
        border-right: none;
      }
    }
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base_menu_widht);
    height: $base_tabbar_height;
    top: 0px;
    left: $base_menu_widht;
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base_menu_widht);
    height: calc(100vh - $base_tabbar_height);
    left: $base_menu_widht;
    top: $base_tabbar_height;
    padding: 20px;
    overflow: auto;
  }
}
</style>
