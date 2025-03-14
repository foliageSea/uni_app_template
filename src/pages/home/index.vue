<route lang="json" type="home">
{
  "name": "home",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>

<template>
  <view class="">
    首页

    <button @click="handleClick">测试</button>
  </view>
</template>

<script lang="ts" setup>
//

const router = useRouter();

const handleClick = () => {
  // router.pushTab({ name: 'personal' });

  uni.navigateTo({
    url: '/pages/personal/index',
  });
};
</script>

<style lang="scss" scoped>
//
</style>
