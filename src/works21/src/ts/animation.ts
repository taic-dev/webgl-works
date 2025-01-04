import { gsap } from "gsap";
import { PERCENTS } from "./constants";

type argType = {
  turn: { x: number; y: number };
  uAnimation: { value: number };
};

type sliderIndexType = {
  uPercents: { value: number[] };
  index: number;
};

export const scaleAnimation = ({ turn, uAnimation }: argType) => {
  const tl = gsap.timeline();
  tl.to(turn, {
    x: 0.05,
    y: 0.05,
  })
    .to(uAnimation, {
      value: 2,
      duration: 1.0,
      ease: "power2.inOut",
    })
    .to(turn, {
      x: 0.005,
      y: 0.005,
    })
    .to(uAnimation, {
      value: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });
};

export const sliderAnimation = ({
  turn,
  uAnimation,
  uPercents,
  index,
}: argType & sliderIndexType) => {
  const tl = gsap.timeline();
  tl.to(turn, {
    x: 0.05,
    y: 0.05,
  })
    .to(uAnimation, {
      value: 0,
      duration: 1.0,
      ease: "power2.inOut",
    })
    .to(uPercents, {
      value: PERCENTS.map((v, i) => {
        return i < index ? 1.0 : v;
      }),
      duration: 0,
    })
    .add(() => {
      scaleAnimation({ turn, uAnimation });
    });
};
