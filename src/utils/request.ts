import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { createUniAppAxiosAdapter } from '@uni-helper/axios-adapter';
import { useUserStore } from '@/store';
import { IBaseResponse } from '@/types/typings';

const {
  VITE_SERVER_BASEURL: baseURL,
  VITE_REQUEST_TIMEOUT,
  VITE_CONTENT_TYPE,
  VITE_SHOW_LOADING,
  VITE_SHOW_ERROR,
} = import.meta.env;

const timeout = JSON.parse(VITE_REQUEST_TIMEOUT);
const showErr = JSON.parse(VITE_SHOW_ERROR);
const showLoading = JSON.parse(VITE_SHOW_LOADING);
export interface ResponseType<T = any> {
  code: number;
  message: string;
  data: T;
}

let requestNum = 0;

interface IRequestConfig extends AxiosRequestConfig {
  loading?: boolean;
  showError?: boolean;
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
    const { loading = showLoading, showError = showErr } =
      response.config as IRequestConfig;
    if (loading) {
      removeLoading();
    }
    cacheAuthToken(response);
    handleServiceError(response);
    return data;
  },
  (error) => {
    removeLoading();
    return Promise.reject(error);
  },
);

function _handleToken(token: string | null) {
  if (token === null || token === '') {
    return null;
  }
  return ['Bearer', token].join(' ');
}

function addAuthHeader(config: IRequestConfig) {
  const token = useUserStore().token;
  const refreshToken = useUserStore().refreshToken;
  config.headers['Authorization'] = _handleToken(token);
  config.headers['x-access-token'] = _handleToken(refreshToken);
}

function cacheAuthToken(response: AxiosResponse) {
  let token = response.headers['access-token'];
  let refreshToken = response.headers['x-access-token'];
  if (_validateToken(token)) {
    useUserStore().setToken(token);
  }
  if (_validateToken(refreshToken)) {
    useUserStore().setRefreshToken(refreshToken);
  }
  let data = response.data;
  let code = data['code'];
  if (code === 401) {
    useUserStore().logout();
    uni.showToast({
      title: '登录过期',
      duration: 2000,
    });
    throw new Error('登录过期');
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
    uni.showToast({
      title: '服务器内部发生错误',
      duration: 2000,
    });
    throw new Error(message);
  } else if (code === 400 || code === 1001) {
    uni.showToast({
      title: message,
      duration: 2000,
    });
    throw new Error(message);
  } else {
    uni.showToast({
      title: message,
      duration: 2000,
    });
    throw new Error(message);
  }
}

function _validateToken(token: string | null) {
  return token !== null && token !== '' && token !== 'invalid_token';
}

export const request = <T>(
  config?: IRequestConfig,
): Promise<IBaseResponse<T>> => {
  return instance.request(config!);
};
