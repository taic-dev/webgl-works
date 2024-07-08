import gsap from "gsap";
import CustomEase from "gsap/CustomEase";

import manzu1 from "../model/manzu/manzu1.glb";
import manzu2 from "../model/manzu/manzu2.glb";
import manzu3 from "../model/manzu/manzu3.glb";
import manzu4 from "../model/manzu/manzu4.glb";
import manzu5 from "../model/manzu/manzu5.glb";
import manzu6 from "../model/manzu/manzu6.glb";
import manzu7 from "../model/manzu/manzu7.glb";
import manzu8 from "../model/manzu/manzu8.glb";
import manzu9 from "../model/manzu/manzu9.glb";

import pinzu1 from "../model/pinzu/pinzu1.glb";
import pinzu2 from "../model/pinzu/pinzu2.glb";
import pinzu3 from "../model/pinzu/pinzu3.glb";
import pinzu4 from "../model/pinzu/pinzu4.glb";
import pinzu5 from "../model/pinzu/pinzu5.glb";
import pinzu6 from "../model/pinzu/pinzu6.glb";
import pinzu7 from "../model/pinzu/pinzu7.glb";
import pinzu8 from "../model/pinzu/pinzu8.glb";
import pinzu9 from "../model/pinzu/pinzu9.glb";

import sozu1 from "../model/sozu/sozu1.glb";
import sozu2 from "../model/sozu/sozu2.glb";
import sozu3 from "../model/sozu/sozu3.glb";
import sozu4 from "../model/sozu/sozu4.glb";
import sozu5 from "../model/sozu/sozu5.glb";
import sozu6 from "../model/sozu/sozu6.glb";
import sozu7 from "../model/sozu/sozu7.glb";
import sozu8 from "../model/sozu/sozu8.glb";
import sozu9 from "../model/sozu/sozu9.glb";

import zihai1 from "../model/zihai/zihai1.glb";
import zihai2 from "../model/zihai/zihai2.glb";
import zihai3 from "../model/zihai/zihai3.glb";
import zihai4 from "../model/zihai/zihai4.glb";
import zihai5 from "../model/zihai/zihai5.glb";
import zihai6 from "../model/zihai/zihai6.glb";
import zihai7 from "../model/zihai/zihai7.glb";

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
};

export const MODEL: { [key: string]: { [key: number]: any } } = {
  MANZU: {
    1: manzu1,
    2: manzu2,
    3: manzu3,
    4: manzu4,
    5: manzu5,
    6: manzu6,
    7: manzu7,
    8: manzu8,
    9: manzu9,
  },
  PINZU: {
    1: pinzu1,
    2: pinzu2,
    3: pinzu3,
    4: pinzu4,
    5: pinzu5,
    6: pinzu6,
    7: pinzu7,
    8: pinzu8,
    9: pinzu9,
  },
  SOZU: {
    1: sozu1,
    2: sozu2,
    3: sozu3,
    4: sozu4,
    5: sozu5,
    6: sozu6,
    7: sozu7,
    8: sozu8,
    9: sozu9,
  },
  ZIHAI: {
    1: zihai1,
    2: zihai2,
    3: zihai3,
    4: zihai4,
    5: zihai5,
    6: zihai6,
    7: zihai7,
  },
};
