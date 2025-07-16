import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = process.env.VITE_API_URL || env.VITE_API_URL;

  if (!apiUrl) {
    throw new Error('VITE_API_URL environment variable is required');
  }

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true,
      allowedHosts: ['tactica.local'],
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          secure: mode === 'production',
        },
      },
    },
  };
});
