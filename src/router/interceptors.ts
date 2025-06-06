import { useUserStore } from '@/store';
import { isWhiteList } from '@/router';
import { styledLog } from '@/utils/logger';

const navigateToInterceptor = {
  invoke({ url }: { url: string }) {
    styledLog('uni 路由拦截器', '#51daab', url);

    // 判断是否登录
    if (useUserStore().token) {
      return true;
    } else {
      const flag = isWhiteList(url);
      if (!flag) {
        styledLog('uni 路由拦截器', '#f53f3f', '未登录，跳转至登录页');
        return uni.navigateTo({ url: '/pages/login/index' });
      }
      return flag;
    }
  },
};

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor);
    uni.addInterceptor('reLaunch', navigateToInterceptor);
    uni.addInterceptor('redirectTo', navigateToInterceptor);
  },
};
