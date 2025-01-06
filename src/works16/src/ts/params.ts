import Texture1 from '../image/texture1.jpg';
import Texture2 from '../image/texture2.jpg';
import Texture3 from '../image/texture3.jpg';
import Texture4 from '../image/texture4.jpg';
import Texture5 from '../image/texture5.jpg';

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
    FAR: 5000,
    POSITION: {
      X: 0.0,
      Y: 0.0,
      Z: 1.0,
    }
  },
  PLANE_GEOMETRY: {
    X: 1,
    Y: 1,
    X_SEGMENTS: 100,
    Y_SEGMENTS: 100,
    ASPECT: 800 / 500
  },
  IMAGE: {
    VALUE: [Texture1, Texture2, Texture3, Texture4, Texture5],
    ASPECT: 3495 / 2280,
  },
  POSITION: {
    
  }

}