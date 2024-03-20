import { Webgl } from "./webgl"

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new Webgl();
  webgl.createRenderer();
  webgl.createCamera();
  webgl.render();
})