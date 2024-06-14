import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export const EASING = {
  transform: CustomEase.create("transform", "M0,0 C0.44,0.05 0.17,1 1,1"),
  colorAndOpacity: CustomEase.create(
    "colorAndOpacity",
    "M0,0 C0.26,0.16 0.1,1 1,1 "
  ),
};

export const PARAMS = {
  WINDOW: {
    W: window.innerWidth,
    H: window.innerHeight,
    PIXEL_RATIO: window.devicePixelRatio,
  },
  CAMERA: {
    FOV: 60,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      X: 0,
      Y: 0,
      Z: 1,
    },
  },
  PLANE_GEOMETRY: {
    X: window.innerWidth,
    Y: window.innerHeight,
    X_SEGMENTS: 1,
    Y_SEGMENTS: 1,
  },
  TEXTURE: [],
}