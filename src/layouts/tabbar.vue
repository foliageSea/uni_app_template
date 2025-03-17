<template>
  <wd-config-provider theme="light" :theme-vars="themeVars">
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
import type { ConfigProviderThemeVars } from 'wot-design-uni';
import { useTabbar } from '@/composables/useTabbar';
import { useMessage } from 'wot-design-uni';

const router = useRouter();

const route = useRoute();

const themeVars: ConfigProviderThemeVars = {
  colorTheme: '#5474f2',
};

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
