import { createI18n } from 'vue-i18n';
// @ts-ignore
import en from './en.json';
// @ts-ignore
import zh from './zh-Hans.json';

const messages = {
  en,
  'zh-CN': zh,
};

const i18n = createI18n({
  locale: uni.getLocale(),
  messages,
});

console.log(uni.getLocale());
console.log(i18n.global.locale);

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
export default i18n;
