import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/cli.ts'],
  outDir: 'dist',
  format: ['esm'],
  target: 'esnext',
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    'node:events', // 避免将 node:events 打包
    'node:path',
    'node:fs',
    'node:util',
    'node:stream',
    'node:buffer',
    'node:crypto',
    'node:http',
    'node:https',
    'node:url',
    'node:querystring',
    'commander', // 如果 commander 是 CJS 的，也建议 external 掉
    'axios', // axios 及其依赖项
    'form-data',
    'combined-stream',
    'delayed-stream',
    'mime-types',
    'mime-db',
    'zod', // zod 也标记为external
  ],
});