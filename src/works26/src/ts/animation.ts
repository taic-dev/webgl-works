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

export const inhaleAnimation = (target: THREE.Group) => {
  gsap.to(target.position,{
      x: 0,
      y: 0,
      z: -100,
      duration: 2.5,
      ease: EASING.transform,
    }
  );

  gsap.to(target.rotation, {
    x: 10,
    y: 10,
    z: -10,
    duration: 2.5,
    ease: EASING.transform,
  });
};
