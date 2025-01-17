import * as THREE from "three";
import { Setup } from "./Setup";
import fragmentShader from "./shader/fragmentShader.glsl";
import vertexShader from "./shader/vertexShader.glsl";
import { PARAMS } from "../utils/constants";
import {
  getElementPositionAndSize,
  type ElementPositionAndSize,
} from "../utils/getElementSize";

export class MvMesh {
  setup: Setup;
  element: HTMLElement | null;
  mesh: THREE.Mesh | null;
  loader: THREE.TextureLoader | null;

  constructor(setup: Setup) {
    this.setup = setup;
    this.element = document.querySelector<HTMLElement>(".effect");
    this.mesh = null;
    this.loader = null;
  }

  init() {
    if (!this.element) return;
    const info = getElementPositionAndSize(this.element);
    this.setUniforms(info);
    this.setMesh(info);
  }

  setUniforms(info: ElementPositionAndSize) {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(PARAMS.WINDOW.W, PARAMS.WINDOW.H),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0.0 },
    };

    return {
      uPlaneSize: { value: new THREE.Vector2(info.dom.width, info.dom.height) },
      ...commonUniforms,
      uTime: { value: Math.floor(Math.random() * 100) + 1 },
    };
  }

  setMesh(info: ElementPositionAndSize) {
    const uniforms = this.setUniforms(info);
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.setup.scene?.add(this.mesh);
    this.mesh.position.x = info.dom.x;
    this.mesh.position.y = info.dom.y;
    this.mesh.position.z = 0;
  }

  updateMesh() {
    if (!this.mesh || !this.element) return;
    const info = getElementPositionAndSize(this.element);
    this.mesh.position.x = info.dom.x;
    this.mesh.position.y = info.dom.y;
  }

  raf() {
    if (!this.mesh) return;
    (this.mesh.material as any).uniforms.uTime.value += 0.01;
  }

  resize() {
    this.updateMesh();
  }
}
