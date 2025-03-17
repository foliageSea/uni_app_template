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
    $message: Message;
    $t: typeof i18n.global.t;
  }
}
