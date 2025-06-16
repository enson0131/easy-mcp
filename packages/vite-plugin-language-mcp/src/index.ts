import type { Plugin } from 'vite';
import type { ILanguageMcpConfig } from 'mcp-core';
import { start } from 'mcp-core';

/**
 * 可以调用 mcp-core 的 Vite 插件，实现语言管理
 * 
 * 1. 在 开发环境 中使用，在 生产环境 中不使用
 * 2. 在 开发环境 中，可以调用 mcp-core 的 Vite 插件，实现语言管理
 * 3. 运用时会判断是否有配置 mcp 文件夹，进行 mcp 配置
 * 
 */
export default function viteLanguageMcp(options: ILanguageMcpConfig): Plugin {
  return {
    name: 'vite-plugin-language-mcp',
    apply: 'serve', // 开发环境中运行,
    configResolved: () => { 
      start(options);
    }
  };
}
