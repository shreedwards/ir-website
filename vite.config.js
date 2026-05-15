import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      input: {
        main:    new URL('./index.html',   import.meta.url).pathname,
        gallery: new URL('./gallery.html', import.meta.url).pathname,
        about:   new URL('./about.html',   import.meta.url).pathname,
      },
    },
  },
})
