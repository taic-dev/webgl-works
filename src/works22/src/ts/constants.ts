export const PARAMS = {
  WINDOW: {
    W: window.innerWidth,
    H: window.innerHeight,
    PIXEL_RATIO: window.innerWidth / window.innerHeight,
  },
  CAMERA: {
    FOV: 60,
    ASPECT: window.innerWidth / window.innerHeight,
    NEAR: 1,
    FAR: 1000,
    POSITION: {
      X: 3,
      Y: 1,
      Z: 3,
    }
  }
}