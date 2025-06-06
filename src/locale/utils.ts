import { Locale } from 'wot-design-uni';
import i18n from './index';

import zhCN from 'wot-design-uni/locale/lang/zh-CN';
import enUS from 'wot-design-uni/locale/lang/en-US';

export enum LocaleEnum {
  zhHans = 'zh-Hans',
  en = 'en',
}

const wotLocals = {
  [LocaleEnum.zhHans]: zhCN,
  [LocaleEnum.en]: enUS,
};

export const useLocale = () => {
  const setLocale = (locale: LocaleEnum | string) => {
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
