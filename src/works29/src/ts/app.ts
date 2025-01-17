import { gsap } from "gsap";
import { App } from "./webgl/App";
import { viewportReload } from "./utils/viewportReload";

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

// webgl
const webgl = new App();
webgl.init();
gsap.ticker.add(() => webgl.render());

// resize
window.addEventListener('resize', () => {
  webgl.resize()
  viewportReload();
})