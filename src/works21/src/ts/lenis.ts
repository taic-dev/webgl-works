import Lenis from "@studio-freight/lenis";

const lenis = new Lenis();

export const lenisLib = {
  lenis,
  raf: (time: number) => {
    lenis.raf(time * 0.8);
    requestAnimationFrame(lenisLib.raf);
  }
};