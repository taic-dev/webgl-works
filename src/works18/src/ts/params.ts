export const PARAMS = {
  WINDOW: {
    W: window.innerWidth,
    H: window.innerHeight,
    PIXEL_RATIO: window.devicePixelRatio
  },
  CAMERA: {
    FOV: 60,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      X: 0.0,
      Y: 0.0,
      Z: 1.0,
    }
  },
  PLANE_GEOMETRY: {
    X: 1,
    Y: 1,
    W_SEGMENTS: 100,
    Y_SEGMENTS: 100,
    ASPECT: 800 / 500
  },
  IMAGE: {
    VALUE: [],
    ASPECT: 3495 / 2280,
  }

}