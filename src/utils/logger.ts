/**
 * 带样式的控制台日志
 * @param message 日志消息
 * @param bgColor 背景色，默认为 #2196F3
 * @param data 附加数据
 */
export function styledLog(
  message: string,
  bgColor = '#2196F3',
  ...data: any[]
) {
  console.log(
    `%c ${message}`,
    `background: ${bgColor}; color: white; padding: 2px 4px; border-radius: 3px;`,
    ...data,
  );
}
