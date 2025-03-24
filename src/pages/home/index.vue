<route lang="json" type="page">
{
  "name": "home",
  "layout": "tabbar",
  "style": {
    "navigationBarTitleText": "首页"
  }
}
</route>

<template>
  <view class="p-8px">
    <view class="mb-8px">首页</view>
    <TestLang />
    <TestIcon />
  </view>
</template>

<script lang="ts" setup>
import TestLang from './components/TestLang.vue';
import TestIcon from './components/TestIcon.vue';
</script>

<style lang="scss" scoped>
//
</style>
