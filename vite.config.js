// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: resolve(__dirname, "src"),
  pages: resolve(__dirname, 'src', 'pages'),
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, './src/index.html'),
        lesson01: resolve(__dirname, './src/task01/index.html'),
      },
    },
  },
})