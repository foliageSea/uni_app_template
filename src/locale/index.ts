import { createI18n } from 'vue-i18n';
// @ts-ignore
import enUS from './lang/en-US.json';
// @ts-ignore
import zhCN from './lang/zh-Hans.json';
import { useLocale } from '@/locale/utils';

const messages = {
  'zh-Hans': zhCN,
  en: enUS,
};

const i18n = createI18n({
  locale: uni.getLocale(),
  messages,
  // 关闭 vue-i18n 的控制台输出
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
});

console.log('uni.getLocale: ', uni.getLocale());
console.log('i18n.global.locale: ', i18n.global.locale);

/**
 * 非 vue 文件使用这个方法
 * @param { string } localeKey 多语言的key，eg: "app.name"
 */
export const translate = (localeKey: string) => {
  if (!localeKey) {
    console.error(`[i18n] Function translate(), localeKey param is required`);
    return '';
  }
  const locale = uni.getLocale();
  console.log('locale:', locale);

  const message = messages[locale];
  if (Object.keys(message).includes(localeKey)) {
    return message[localeKey];
  }
  return localeKey;
};

// 挂载到 uni 上
uni.$t = i18n.global.t;

export function stepUpI18n(app: any) {
  app.use(i18n);
  app.config.globalProperties.$t = uni.$t;
  // #ifdef H5
  window.$t = uni.$t;
  // #endif
  useLocale().initLocale();
}

export default i18n;
