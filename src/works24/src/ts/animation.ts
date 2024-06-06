import gsap from "gsap";
import { EASING } from "./constants";

export const loadingAnimation = (
  targetLoading: object,
  targetOffset: object
) => {
  gsap.fromTo(
    targetLoading,
    {
      value: 3,
      duration: 1,
      ease: EASING.transform,
    },
    {
      value: 0,
      duration: 3,
      ease: EASING.transform,
    }
  );

  gsap.fromTo(
    targetOffset,
    {
      x: -15,
      y: -5,
      duration: 1,
      ease: EASING.transform,
    },
    {
      x: 0,
      y: 0,
      duration: 3,
      ease: EASING.transform,
    }
  );
};

export const scrollAnimation = (target: object, x: number, y: number) => {
  gsap.to(target, {
    x,
    y,
    duration: 0.5,
  });
};
