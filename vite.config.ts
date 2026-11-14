import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        '@vercel/speed-insights/next': path.resolve(__dirname, 'node_modules/@vercel/speed-insights/dist/react/index.mjs'),
      },
    },
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-three': ['three'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
            'vendor-charts': ['recharts'],
            'vendor-swiper': ['swiper'],
          },
        },
      },
    },
    server: {
      hmr: false,
      watch: null,
    },
  };
});
