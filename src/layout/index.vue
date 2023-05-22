<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">1</div>
        <!-- 顶部菜单 -->
        <div class="layout_tabbar">2</div>
        <!-- 内容展示区域 -->
        <div class="layout_main">3</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base_menu_widht;
        height: 100vh;
        background: $base_menu_backgroud;
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