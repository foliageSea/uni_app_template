import { request } from '@/utils/request';
import { serviceName } from '@/constants';
import { IBaseResponse } from '@/types/typings';

export const useUserService = () => {
  const controllerName = '/user/';

  const login = (data: any) => {
    return request<IBaseResponse<any>>({
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
