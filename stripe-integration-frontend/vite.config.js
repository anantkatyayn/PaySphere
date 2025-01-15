import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs',
    preprocessorOptions: {
      css: {
        additionalData: '@import "tailwindcss/base";',
      },
    },
  },
});
