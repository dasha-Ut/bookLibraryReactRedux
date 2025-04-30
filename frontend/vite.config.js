import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  base: '/30-react-redux/',
  plugins: [react()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    css: false,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: 'setupTests.js',
  },
});
// environment: 'jsdom', - environment, where tests will start. creates an imitation of dom tree
