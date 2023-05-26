<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="" />
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
// 引入设置标题与logo配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
    name: 'Logo',
}
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base_menu_logo_height;
    color: white;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 35;
        height: 35;
    }

    p {
        font-size: $base_logo_title_fontSize;
        margin-left: 10px;
    }
}
</style>
