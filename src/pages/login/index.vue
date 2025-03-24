<route lang="json" type="home">
{
  "style": { "navigationBarTitleText": "登录" },
  "name": "login"
}
</route>
<template>
  <view class="content">
    登录页
    <wd-button @click="handleLogin">登录</wd-button>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store';

const router = useRouter();
const userStore = useUserStore();

function toHome() {
  router.replaceAll({
    path: '/pages/home/index',
  });
}

function handleLogin() {
  userStore.setToken('Test');
  toHome();
}

onShow(() => {
  if (useUserStore().token) {
    toHome();
  }
});
</script>
