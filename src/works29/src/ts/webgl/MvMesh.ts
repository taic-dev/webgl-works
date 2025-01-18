import * as THREE from "three";
import { Setup } from "./Setup";
import fragmentShader from "./shader/mv/fragmentShader.glsl";
import vertexShader from "./shader/mv/vertexShader.glsl";
import { PARAMS } from "../utils/constants";

export class MvMesh {
  setup: Setup;
  mesh: THREE.Mesh | null;
  loader: THREE.TextureLoader | null;

  constructor(setup: Setup) {
    this.setup = setup;
    this.mesh = null;
    this.loader = null;
  }

  init() {
    this.setUniforms();
    this.setMesh();
  }

  setUniforms() {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(PARAMS.WINDOW.W, PARAMS.WINDOW.H),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
      uColor1: { value: 0.2 },
      uColor2: { value: 0.2667 },
      uColor3: { value: 0.4706 }
    };

    return {
      ...commonUniforms,
      uTime: { value: Math.floor(Math.random() * 100) + 1 },
    };
  }

  setMesh() {
    const uniforms = this.setUniforms();
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.setup.scene?.add(this.mesh);
  }

  raf() {
    if (!this.mesh) return;
    (this.mesh.material as any).uniforms.uTime.value += 0.01;
    (this.mesh.material as any).uniforms.uColor1.value = this.setup.guiValue.color1;
    (this.mesh.material as any).uniforms.uColor2.value = this.setup.guiValue.color2;
    (this.mesh.material as any).uniforms.uColor3.value = this.setup.guiValue.color3;
  }
}
