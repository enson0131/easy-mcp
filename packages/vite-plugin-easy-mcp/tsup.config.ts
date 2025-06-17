import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs'],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
});