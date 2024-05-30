import { Webgl } from "./webgl";
import { lenisLib } from "./lenis";

window.addEventListener("DOMContentLoaded", () => {
  // lenis
  lenisLib.raf(1);

  // webgl
  const webgl = new Webgl();
  webgl.init();

  window.addEventListener("resize", () => {
    webgl.onResize();
  });
});
