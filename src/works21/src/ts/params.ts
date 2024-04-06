import texture from '../img/texture.jpg'

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
      X: 1,
      Y: 1,
      Z: 1,
    }
  },
  PLANE_GEOMETRY: {
    X: window.innerWidth,
    Y: window.innerHeight,
    X_SEGMENTS: 1,
    Y_SEGMENTS: 1,
  },
  TEXTURE: texture
}