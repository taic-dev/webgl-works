import { gsap } from "gsap";

type argType = {
  turn: { x: number; y: number };
  uAnimation: { value: number };
};

type sliderIndexType = {
  sliderIndex: {
    index: number;
    current: { value: number };
  };
};

export const scaleAnimation = ({ turn, uAnimation }: argType) => {
  const tl = gsap.timeline();
  tl.to(turn, {
    x: 0.05,
    y: 0.05,
  })
    .to(uAnimation, {
      value: 1.5,
      duration: 1.0,
      ease: "power2.inOut",
    })
    .to(turn, {
      x: 0.005,
      y: 0.005,
    })
    .to(uAnimation, {
      value: 1,
      duration: 1.0,
      ease: "power2.inOut",
    });
};

export const sliderAnimation = ({
  turn,
  uAnimation,
  sliderIndex,
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
    .to(sliderIndex.current, {
      value: sliderIndex.index,
    })
    .add(() => {
      scaleAnimation({ turn, uAnimation });
    });
};
