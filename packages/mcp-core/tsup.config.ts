import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
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
    'commander', // 如果 commander 是 CJS 的，也建议 external 掉
  ],
});