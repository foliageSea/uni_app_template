// docs: https://moonofweisheng.github.io/uni-mini-router/
import { createRouter } from 'uni-mini-router';
// 导入pages.json
// @ts-ignore
import pagesJson from '../pages.json';
// 引入uni-parse-pages
import pagesJsonToRoutes from 'uni-parse-pages';
import { isWhiteList } from './white-list';
import { useUserStore } from '@/store';

// 生成路由表
const routes = pagesJsonToRoutes(pagesJson);
const router = createRouter({
  routes: [...routes], // 路由表信息
});

router.beforeEach((to, _, next) => {
  console.log('uni-mini-router 路由守卫', to);
  // 判断是否登录
  if (useUserStore().token) {
    next(true);
  } else {
    const flag = isWhiteList(to.path);
    if (!flag) {
      router.replaceAll({
        path: '/pages/login/index',
      });
      next(false);
      return;
    }
    next(true);
  }
});

export default router;
export * from './interceptors';
export * from './white-list';
