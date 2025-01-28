import { App } from "./webgl/App";

const webgl = new App();
webgl.init();
webgl.render();

window.addEventListener('resize', () => {
  webgl.resize()
})