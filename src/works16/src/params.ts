export const PARAMS = {
  CAMERA_PARAMS: {
    fov: 50,
    aspect: 500 / 700,
    near: 1.0,
    far: 100,
  },
  CAMERA_POSITION_PARAMS: {
    X: 0.0,
    Y: 0.0,
    Z: 1.0,
  },
  AMBIENT_LIGHT: {
    LIGHT_COLOR: 0xffffff,
    INTENSITY: 0.5,
  },
  DIRECTIONAL_LIGHT: {
    LIGHT_COLOR: 0xffffff,
    INTENSITY: 0.5,
  },
  PLANE_GEOMETRY: {
    W: window.innerWidth,
    Y: window.innerHeight
  },
  MATERIAL: {
    COLOR: 0x0000FF
  }
} as const
