import * as THREE from "three";

export class Webgl {
  static createCamera(): any {
    throw new Error("Method not implemented.");
  }
  constructor() {}

  createCamera(parameters: {
    fov: number;
    aspect: number;
    near: number;
    far: number;
  }) {
    const { fov, aspect, near, far } = parameters;
    const perspectiveCamera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    );
    return perspectiveCamera;
  }

  createAmbientLight(lightColor: number, lightIntensity: number) {
    const ambientLight = new THREE.AmbientLight(lightColor, lightIntensity);
    return ambientLight;
  }

  createDirectionalLight(lightColor: number, lightIntensity: number) {
    const directionalLight = new THREE.DirectionalLight(
      lightColor,
      lightIntensity
    );
    return directionalLight;
  }

  createPlaneGeometry(width: number, height: number) {
    const planeGeometry = new THREE.PlaneGeometry(width, height);
    return planeGeometry;
  }

  createMaterial(parameters: object) {
    const material = new THREE.MeshBasicMaterial(parameters);
    return material;
  }

  createMesh(geometry: any, material: any) {
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }
}
