import { PARAMS } from "./params";

export class ImagePlane {
  [x: string]: any;

  constructor(mesh: THREE.Mesh, img: string) {
    this.refImage = img;
    this.mesh = mesh;
  }

  setParams() {
    const rect = this.refImage.getBoundingClientRect();

    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;

    const x = rect.left - PARAMS.WINDOW.WIDTH / 2 + rect.width / 2;
    const y = -rect.top + PARAMS.WINDOW.HEIGHT / 2 - rect.height / 2;

    this.mesh.position.set(x, y, this.mesh.position.z);
  }

  update() {
    this.setParams();
    this.mesh.material.uniforms.uTime.value++
  }
}