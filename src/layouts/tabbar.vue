<template>
  <wd-config-provider :theme="theme.theme">
    <view class="tabbar-app-layout">
      <wd-navbar
        :title="$t(activeTabbar.title)"
        safe-area-inset-top
        placeholder
        fixed
        :bordered="false"
      />

      <slot />
      <wd-tabbar
        :model-value="activeTabbar.name"
        placeholder
        bordered
        safe-area-inset-bottom
        fixed
        @change="handleTabbarChange"
      >
        <wd-tabbar-item
          v-for="(item, index) in tabbarList"
          :key="index"
          :name="item.name"
          :value="getTabbarItemValue(item.name)"
          :title="$t(item.title)"
          :icon="item.icon"
        />
      </wd-tabbar>
      <wd-toast />
      <wd-message-box />
    </view>
  </wd-config-provider>
</template>

<script setup lang="ts">
import { useTabbar } from '@/composables/useTabbar';
import { useMessage } from 'wot-design-uni';

import { useThemeStore } from '@/store';

const router = useRouter();

const route = useRoute();

const theme = useThemeStore();

const { activeTabbar, getTabbarItemValue, setTabbarItemActive, tabbarList } =
  useTabbar();

function handleTabbarChange({ value }: { value: string }) {
  setTabbarItemActive(value);
  router.pushTab({ name: value });
}

const message = useMessage();
uni.$message = message;

onMounted(() => {
  nextTick(() => {
    if (route.name && route.name !== activeTabbar.value.name) {
      setTabbarItemActive(route.name);
    }
  });
});

onShow(() => {
  uni.hideTabBar();
});
</script>

<style lang="scss" scoped>
.tabbar-app-layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
