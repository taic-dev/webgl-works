import Texture1 from "../image/texture1.jpg";

export const PARAMS = {
  WINDOW: {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
  },
  CAMERA: {
    FOV: 45,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 100,
    POSITION: {
      X: 0.0,
      Y: 0.0,
      Z: 1.0,
    }
  },
  AMBIENT_LIGHT: {
    COLOR: 0xFFFFFF,
    INTENSITY: 0.5,
  },
  DIRECTIONAL_LIGHT: {
    COLOR: 0xFFFFFF,
    INTENSITY: 0.5,
  },
  PLANE_GEOMETRY: {
    X: 1,
    Y: 1,
    ASPECT: 800 / 500
  },
  IMAGE: {
    VALUE: [Texture1],
    ASPECT: 3495 / 2280,
  }
} as const