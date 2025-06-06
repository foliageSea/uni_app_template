import { request } from '@/utils/request';
import { serviceName } from '@/constants';
import { IPageData } from '@/types/typings';

export const useUserService = () => {
  const controllerName = '/user/';

  const login = (data: any) => {
    return request<any>({
      url: `${serviceName}${controllerName}login`,
      method: 'post',
      data,
      loading: true,
    });
  };

  const list = () => {
    return request<IPageData<any>>({
      url: `${serviceName}${controllerName}list`,
      method: 'get',
    });
  };

  return {
    login,
    list,
  };
};
