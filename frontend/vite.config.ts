import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    viteReact(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Добавьте этот раздел:
  server: {
    host: true, // Позволяет доступ извне контейнера
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://backend:8000', // Имя сервиса из docker-compose.yml
        changeOrigin: true,
        secure: false, // Используйте true, если backend на https
      },
    },
  },
})