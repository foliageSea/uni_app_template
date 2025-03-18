import { request } from '@/utils/request';
import { serviceName } from '@/constants';
import { IPageData } from '@/types/typings';

const useUserService = () => {
  const controllerName = '/user/';

  const login = (data: any) => {
    return request<IPageData<any>>({
      url: `${serviceName}${controllerName}login`,
      method: 'post',
      data,
      loading: true,
    });
  };
  return {
    login,
  };
};
