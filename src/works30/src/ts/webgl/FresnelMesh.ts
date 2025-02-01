import * as THREE from "three";
import { Setup } from "./Setup";

export class FresnelMesh {
  setup: Setup;
  mesh: THREE.Mesh | null;
  loader: THREE.TextureLoader | null;
  cubeRenderTarget: THREE.WebGLCubeRenderTarget | null;
  cubeCamera: THREE.CubeCamera | null;

  constructor(setup: Setup) {
    this.setup = setup;
    this.mesh = null;
    this.loader = null;
    this.cubeRenderTarget = null;
    this.cubeCamera = null;
  }

  init() {
    this.setUniforms();
    this.setMesh();
  }

  setUniforms() {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    return {
      ...commonUniforms,
    };
  }

  setMesh() {
    const geometry = new THREE.IcosahedronGeometry(100, 15);
    const material = new THREE.MeshPhysicalMaterial({
      roughness: 0,
      transmission: 1,
      thickness: 100,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.setup.scene?.add(this.mesh);
    this.mesh.position.set(0, -150, 100);
  }

  resize() {
    (this.mesh?.material as any).uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  }

  raf() {
    if (!this.mesh || !this.setup.renderer || !this.setup.scene) return;

  }
}
