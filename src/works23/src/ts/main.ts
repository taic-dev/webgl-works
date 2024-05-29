import Lenis from "@studio-freight/lenis";
import { Webgl } from "./webgl";

window.addEventListener("DOMContentLoaded", () => {
  // lenis
  const lenis = new Lenis();
  lenis.start();

  const raf = (time: number) => {
    lenis.raf(time * 0.8);
    requestAnimationFrame(raf);

    if(document.documentElement.classList.contains('is-hidden')) {
      lenis.stop();
    }
  };
  requestAnimationFrame(raf);

  // webgl
  const webgl = new Webgl();
  webgl.init();

  window.addEventListener("resize", () => {
    webgl.onResize();
  });
});
