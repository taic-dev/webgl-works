// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import gltf from 'vite-plugin-gltf';
import rawLoader from 'vite-raw-plugin';

export default defineConfig({
  root: "src",
  plugins: [
    gltf({
      include: ["**/*.gltf",]
    }),
    rawLoader({
      fileRegex: /\.glsl$/
    }),
  ],
  build: {
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.html'),
        works01: resolve(__dirname, 'src/works01/index.html'),
        works02: resolve(__dirname, 'src/works02/index.html'),
        works03: resolve(__dirname, 'src/works03/index.html'),
        works04: resolve(__dirname, 'src/works04/index.html'),
        works05: resolve(__dirname, 'src/works05/index.html'),
        works06: resolve(__dirname, 'src/works06/index.html'),
        works07: resolve(__dirname, 'src/works07/index.html'),
        works08: resolve(__dirname, 'src/works08/index.html'),
        works09: resolve(__dirname, 'src/works09/index.html'),
        works10: resolve(__dirname, 'src/works10/index.html'),
        works11: resolve(__dirname, 'src/works11/index.html'),
        works12: resolve(__dirname, 'src/works12/index.html'),
        works13: resolve(__dirname, 'src/works13/index.html'),
        works14: resolve(__dirname, 'src/works14/index.html'),
        works15: resolve(__dirname, 'src/works15/index.html'),
        works16: resolve(__dirname, 'src/works16/index.html'),
        works17: resolve(__dirname, 'src/works17/index.html'),
        works18: resolve(__dirname, 'src/works18/index.html'),
        works19: resolve(__dirname, 'src/works19/index.html'),
      },
    },
    assetsInclude: ['*.gltf'],
    chunkSizeWarningLimit: 100000000,
  },
})