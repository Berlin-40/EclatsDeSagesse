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
   server: {
    proxy: {
      '/api': {
        target: 'https://kaamelott.chaudie.re', // l'API réelle
        changeOrigin: true, // pour éviter les refus de domaine
        rewrite: (path) => path.replace(/^\/api/, ''), // retire le préfixe /api
      },
    },
  },
}
)
