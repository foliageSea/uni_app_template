<route lang="json" type="page">
{
  "name": "personal",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "个人"
  }
}
</route>

<template>
  <view class="">
    个人

    <wd-button @click="handleLogout">退出登录</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store';

const userStore = useUserStore();
const router = useRouter();

function handleLogout() {
  userStore.token = '';
  router.push({
    path: '/pages/login/index',
  });
}
</script>

<style lang="scss" scoped>
//
</style>
