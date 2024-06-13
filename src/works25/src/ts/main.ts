import { Webgl } from "./webgl";
import { textAnimation } from "./animation";

const webgl = new Webgl();

window.addEventListener("load", () => {
  // webgl
  webgl.init();
  webgl.render();

  // text animation
  textAnimation();
});

window.addEventListener("resize", () => {
  // webgl
  webgl.onResize();

  // text animation
  textAnimation();
});