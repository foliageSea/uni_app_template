export {};
declare module '*.json' {
  const value: Record<string, any>;
  export default value;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, opt?: Record<string, any>) => string;
  }
}

// 声明 uni 全局属性
declare global {
  interface Uni {
    $t: typeof i18n.global.t;
  }
  interface Window {
    $t: typeof i18n.global.t;
  }
}
export interface IBaseResponse<T> {
  code: number;
  message: string;
  data: T;
  provider: string;
  responseTime: string;
  success: boolean;
  timestamp: number;
}

export interface IPageData<T> {
  pageNo: number;
  pageSize: number;
  rows: T[];
  totalPages: number;
  totalRows: number;
}
