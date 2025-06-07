import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
  AxiosError,
} from 'axios';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import { useUserStore } from '@/store';
import { IBaseResponse } from '@/types/typings';

const {
  VITE_SERVER_BASEURL: baseURL,
  VITE_REQUEST_TIMEOUT,
  VITE_CONTENT_TYPE,
  VITE_SHOW_LOADING,
} = import.meta.env;

const timeout = JSON.parse(VITE_REQUEST_TIMEOUT);
const showLoading = JSON.parse(VITE_SHOW_LOADING);

let requestNum = 0;

interface IRequestConfig extends AxiosRequestConfig {
  loading?: boolean;
}

const addLoading = () => {
  requestNum++;
  if (requestNum === 1 && showLoading) {
    uni.showLoading({
      title: '加载中...',
    });
  }
};
const removeLoading = () => {
  requestNum--;
  if (requestNum === 0) {
    uni.hideLoading();
  }
};

const debounceTokenCancel = new Map();

const instance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': VITE_CONTENT_TYPE,
  },
  adapter: createUniAppAxiosAdapter(),
});

// 请求拦截器
instance.interceptors.request.use(
  (config: IRequestConfig): any => {
    const { loading = showLoading } = config;
    if (loading) {
      addLoading();
    }
    addAuthHeader(config);
    const requestTokenKey = `${config.method}_${config.url}`;
    const cancelToken = debounceTokenCancel.get(requestTokenKey);
    if (cancelToken) {
      cancelToken();
    }
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        resolve(config);
      }, 800);
      debounceTokenCancel.set(requestTokenKey, () => {
        clearTimeout(timer);
        resolve(new Error('请勿重复请求'));
      });
    });
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */
  (response: AxiosResponse) => {
    const data = response.data;
    const { loading = showLoading } = response.config as IRequestConfig;
    if (loading) {
      removeLoading();
    }
    cacheAuthToken(response);
    handleServiceError(response);
    return data;
  },
  (error: AxiosError) => {
    removeLoading();
    handleError(error);
    return Promise.reject(error);
  },
);

const ERR_CUSTOM = 'ERR_CUSTOM';

const errorMap = new Map([
  ['ECONNABORTED', '请求超时，请检查网络连接'],
  ['ETIMEDOUT', '连接超时，请稍后重试'],
  ['ERR_NETWORK', '网络错误，请检查网络连接'],
  ['ERR_BAD_REQUEST', '请求错误'],
  ['ERR_BAD_RESPONSE', '服务器响应异常'],
  ['ERR_FR_TOO_MANY_REDIRECTS', '重定向次数过多'],
  ['ERR_BAD_OPTION_VALUE', '无效的配置值'],
  ['ERR_BAD_OPTION', '无效的配置选项'],
  ['ERR_DEPRECATED', '使用了已废弃的API'],
  ['ERR_NOT_SUPPORT', '不支持的操作'],
  ['ERR_INVALID_URL', '无效的URL地址'],
  ['ERR_CANCELED', '请求已被取消'],
  [ERR_CUSTOM, null],
]);

function handleError(error: AxiosError) {
  const code = error.code;
  const message = errorMap.get(code) || error.message || '未知错误';
  uni.showToast({
    title: message,
    icon: 'none',
    duration: 2000,
  });
}

function handleToken(token: string | null) {
  if (token === null || token === '') {
    return null;
  }
  return ['Bearer', token].join(' ');
}

function addAuthHeader(config: IRequestConfig) {
  const token = useUserStore().token;
  const refreshToken = useUserStore().refreshToken;
  config.headers['Authorization'] = handleToken(token);
  config.headers['x-access-token'] = handleToken(refreshToken);
}

function cacheAuthToken(response: AxiosResponse) {
  let token = response.headers['access-token'];
  let refreshToken = response.headers['x-access-token'];
  if (validateToken(token)) {
    useUserStore().setToken(token);
  }
  if (validateToken(refreshToken)) {
    useUserStore().setRefreshToken(refreshToken);
  }
  handle404(response);
}

function handle404(response: AxiosResponse) {
  let data = response.data;
  let code = data['code'];
  if (code === 401) {
    useUserStore().logout();
    throw new AxiosError('登录过期', ERR_CUSTOM);
  }
}

function handleServiceError(response: AxiosResponse) {
  let data = response.data;
  let code = data['code'];
  let success = data['success'];
  let message = data['message'];
  if (success) {
    return;
  }
  if (code === 500) {
    throw new AxiosError(message, ERR_CUSTOM);
  } else if (code === 400 || code === 1001) {
    throw new AxiosError(message, ERR_CUSTOM);
  } else {
    throw new AxiosError(message, ERR_CUSTOM);
  }
}

function validateToken(token: string | null) {
  return token !== null && token !== '' && token !== 'invalid_token';
}

export const request = <T>(
  config?: IRequestConfig,
): Promise<IBaseResponse<T>> => {
  return instance.request(config!);
};
