import { gsap } from "gsap";
import { App } from "./webgl/App";
import { BREAK_POINT } from "./utils/constants";
import { Animations } from "./animations";

window.addEventListener("load", () => {
  document.body.classList.add("is-loaded");
});

const animations = new Animations();

// webgl
const webgl = new App();
webgl.init();
gsap.ticker.add(() => webgl.render());

// transition / loading
animations.mvFadeIn(webgl)
animations.mvFadeOut(webgl)

// scroll
window.addEventListener('scroll', () => {
  webgl.update()
})

// resize
window.addEventListener('resize', () => {
  webgl.resize()

  if(window.innerWidth < BREAK_POINT.MD) {
    location.reload();
  }
})