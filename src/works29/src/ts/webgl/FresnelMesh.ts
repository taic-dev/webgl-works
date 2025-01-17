import * as THREE from "three";
import { Setup } from "./Setup";
import { PARAMS } from "../utils/constants";
import fragmentShader from "./shader/fresnel/fragmentShader.glsl";
import vertexShader from "./shader/fresnel/vertexShader.glsl";

export class FresnelMesh {
  setup: Setup
  mesh: THREE.Mesh | null;
  loader: THREE.TextureLoader | null;
  cubeRenderTarget: THREE.WebGLCubeRenderTarget | null;
  cubeCamera: THREE.CubeCamera | null;

  constructor(setup: Setup) {
    this.setup = setup;
    this.mesh = null;
    this.loader = null;
    this.cubeRenderTarget = null
    this.cubeCamera = null
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
    };

    return {
      tCube: { value: 0.0 },
      ...commonUniforms,
      uTime: { value: Math.floor(Math.random() * 100) + 1 },
    };
  }

  setMesh() {
    const uniforms = this.setUniforms();
    const geometry = new THREE.SphereGeometry(1.8, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.setup.scene?.add(this.mesh);
    this.mesh.position.x = 1;
    this.mesh.position.y = 0.5;
    this.mesh.position.z = -1.8;

    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapNearestFilter,
    });

    this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget);
  }

  resize() {
    (this.mesh?.material as any).uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  }

  raf() {
    if(!this.setup.renderer || !this.setup.scene) return
    this.cubeCamera?.update(this.setup.renderer, this.setup.scene);
    (this.mesh?.material as any).uniforms.tCube.value = this.cubeRenderTarget?.texture;
  }
}