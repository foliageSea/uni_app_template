<template>
  <view class="flex justify-evenly">
    <wd-button @click="onClick">{{ $t('测试') }}</wd-button>

    <wd-button @click="onChange">{{ $t('切换') }}</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { useLocale } from '@/locale/utils';

function onClick() {
  uni.$message.alert(
    uni.$t('范围: {a}-{b}', {
      a: 1,
      b: 2,
    }),
  );
}

function onChange() {
  const local = uni.getLocale();
  console.log(local);
  useLocale().setLocale(local === 'zh-Hans' ? 'en-US' : 'zh-Hans');
}
</script>
