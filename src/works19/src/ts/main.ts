import { Webgl } from "./webgl"

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new Webgl();
  webgl.init();
  webgl.render();

  window.addEventListener('resize', () => {
    webgl._onResize();
  })

  window.addEventListener('pointermove', (e: MouseEvent) => {
    webgl._onPointerMove(e);
  })
})