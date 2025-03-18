<template>
  <view class="">
    <wd-button @click="onClick">切换主题</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';

const theme = useThemeStore();

function onClick() {
  theme.toggleTheme();
}
</script>
