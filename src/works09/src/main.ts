import { WebGL } from "./webgl";

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new WebGL()
  webgl.init()
  webgl.render()
});