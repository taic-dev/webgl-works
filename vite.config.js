// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: "src",
  // base: '/webgl-school-task/',
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        task01: resolve(__dirname, 'src/task01/index.html'),
        task02: resolve(__dirname, 'src/task02/index.html'),
        task03: resolve(__dirname, 'src/task03/index.html'),
        practice01: resolve(__dirname, 'src/practice01/index.html'),
      },
    },
  },
})