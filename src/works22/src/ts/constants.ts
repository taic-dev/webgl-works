import * as THREE from "three";

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
      X: 13,
      Y: 3,
      Z: 13,
    },
  },
  GEOMETRY: [
    new THREE.PlaneGeometry(10, 10),
    new THREE.TorusKnotGeometry(4, 1.3, 100, 16),
    new THREE.SphereGeometry(5, 32, 32),
    new THREE.BoxGeometry(10, 10, 10),
    new THREE.ConeGeometry(5, 10, 32),
    new THREE.CylinderGeometry(3, 3, 10, 32),
    new THREE.TorusGeometry(5, 2, 16, 100),
  ],
};

export const PERCENTS = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

export const POSITION_NAME = [
  "position",
  "TorusKnotPosition",
  "SpherePosition",
  "BoxPosition",
  "ConePosition",
  "CylinderPosition",
  "TorusPosition",
];
