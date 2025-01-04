import gsap from "gsap";
import { EASING } from "./constants";
import { randomNum } from "./utils";

export const firstAnimation = (
  target: THREE.Group,
  targetSize: { x: number; y: number; z: number }
) => {
  gsap.to(target.scale, {
    x: targetSize.x,
    y: targetSize.y,
    z: targetSize.z,
    duration: 2.5,
    ease: EASING.transform,
  });

  gsap.to(target.rotation, {
    x: 0,
    y: 12.5,
    z: randomNum(10, 0),
    duration: 2.5,
    ease: EASING.transform,
  });
};

export const vomitAnimation = (target: THREE.Group) => {
  gsap.to(target.position, {
    x: randomNum(20, 20),
    y: randomNum(25, 25),
    z: randomNum(10, 10),
    duration: 1.5,
    ease: EASING.transform,
  });

  gsap.to(target.rotation, {
    x: 0,
    y: 12.5,
    z: randomNum(10, 0),
    duration: 2.5,
    ease: EASING.transform,
  });
};
