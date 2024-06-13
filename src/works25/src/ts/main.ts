import { Webgl } from "./webgl"

const webgl = new Webgl();

window.addEventListener('DOMContentLoaded', () => {
  webgl.init();
  webgl.render();
})

window.addEventListener('resize', () => {
  webgl.onResize();
})