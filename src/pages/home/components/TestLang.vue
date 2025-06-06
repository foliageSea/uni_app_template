<template>
  <view class="flex justify-evenly">
    <wd-button @click="onChange">{{ $t('切换') }}</wd-button>
  </view>
</template>

<script lang="ts" setup>
import { useLocale, LocaleEnum } from '@/locale/utils';

function onChange() {
  const local = uni.getLocale();
  console.log(local);
  useLocale().setLocale(
    local === LocaleEnum.zhHans ? LocaleEnum.en : LocaleEnum.zhHans,
  );
}
</script>
