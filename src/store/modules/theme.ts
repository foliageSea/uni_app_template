import { defineStore } from 'pinia';
import type { ConfigProviderThemeVars } from 'wot-design-uni';

const themeVars: ConfigProviderThemeVars = {
  colorTheme: '#5474f2',
};

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
    themeVars: themeVars,
  }),

  getters: {},

  actions: {
    setTheme(theme: string | 'light' | 'dark') {
      this.theme = theme;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
  },
  unistorage: true,
});
