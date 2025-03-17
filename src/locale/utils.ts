import { Locale } from 'wot-design-uni';
import i18n from './index';

import zhCN from 'wot-design-uni/locale/lang/zh-CN';
import enUS from 'wot-design-uni/locale/lang/en-US';

const wotLocals = {
  'zh-Hans': zhCN,
  en: enUS,
};

export const useLocale = () => {
  const setLocale = (locale: string) => {
    Locale.use(locale, wotLocals[locale]);
    i18n.global.locale = locale;
    uni.setLocale(locale);
  };

  const initLocale = () => {
    const locale = uni.getLocale();
    setLocale(locale);
  };

  return {
    setLocale,
    initLocale,
  };
};
