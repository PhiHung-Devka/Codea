import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@repo/packages/styles/variables" as *;
          @use "@repo/packages/styles/mixin" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@repo/packages': path.resolve(__dirname, "src/packages"),
      '@repo/features': path.resolve(__dirname, "src/features"),
      '@repo/component': path.resolve(__dirname, "src/components"),
      '@repo/assets': path.resolve(__dirname, "src/assets")
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
        },
      },
    },
  },
})
