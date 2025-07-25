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
          'http://localhost:3001/assets/remoteEntry.js',
        'view-customers-app':
          'http://localhost:3002/assets/remoteEntry.js',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        '@/packages/ui',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': '../../',
    },
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
