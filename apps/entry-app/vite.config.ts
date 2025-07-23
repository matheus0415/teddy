import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'entry-app',
      remotes: {
        'manage-customers-app':
          process.env.VITE_MANAGE_CUSTOMERS_URL ||
          'http://localhost:3001/assets/remoteEntry.js',
        'view-customers-app':
          process.env.VITE_VIEW_CUSTOMERS_URL ||
          'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': '../../',
      '@/components': './src/components',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
