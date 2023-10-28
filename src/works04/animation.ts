import { gsap } from "gsap";

export function fadeIn(element: Element, delayNum: number) {
  return gsap.to(element, { 
    x: 0, 
    duration: 0.5,
    delay: delayNum,
    autoAlpha: 1
  })
}

export function fadeOut(element: Element, delayNum: number) {
  return gsap.to(element, { 
    x: -10, 
    duration: 0.5,
    delay: delayNum,
    autoAlpha: 0
  })
}