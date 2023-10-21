// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import gltf from 'vite-plugin-gltf';

export default defineConfig({
  root: "src",
  // base: '/webgl-school-task/',
  plugins: [
    gltf({
      include: ["**/*.gltf",]
    })
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        task01: resolve(__dirname, 'src/task01/index.html'),
        task02: resolve(__dirname, 'src/task02/index.html'),
        task03: resolve(__dirname, 'src/task03/index.html'),
        task04: resolve(__dirname, 'src/task04/index.html'),
        task05: resolve(__dirname, 'src/task05/index.html'),
        practice01: resolve(__dirname, 'src/practice01/index.html'),
        practice02: resolve(__dirname, 'src/practice02/index.html'),
        practice03: resolve(__dirname, 'src/practice03/index.html'),
        practice04: resolve(__dirname, 'src/practice04/index.html'),
        practice05: resolve(__dirname, 'src/practice05/index.html'),
        practice06: resolve(__dirname, 'src/practice06/index.html'),
      },
    },
    assetsInclude: ['*.gltf'],
    chunkSizeWarningLimit: 100000000,
  },
})