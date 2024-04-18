import texture1 from "../img/texture1.png";
import texture2 from "../img/texture2.png";
import texture3 from "../img/texture3.png";
import texture4 from "../img/texture4.png";

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
      Z: 180,
    },
  },
  PLANE_GEOMETRY: {
    X: window.innerWidth,
    Y: window.innerHeight,
    X_SEGMENTS: 1,
    Y_SEGMENTS: 1,
  },
  TEXTURE: [ texture1, texture2, texture3, texture4 ],
};
