import { Webgl } from "./webgl"

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new Webgl();
  webgl.init();
  webgl.render();
})

window.addEventListener('resize', () => {
  const webgl = new Webgl();
  webgl._onResize();
})