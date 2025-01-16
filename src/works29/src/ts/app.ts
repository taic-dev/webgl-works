import { gsap } from "gsap";
import { App } from "./webgl/App";
import { BREAK_POINT } from "./utils/constants";

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

  if(window.innerWidth < BREAK_POINT.MD) {
    location.reload();
  }
})