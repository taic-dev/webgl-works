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
    const geometry = new THREE.SphereGeometry(0.4, 32, 32);
    const material = new THREE.ShaderMaterial({
      // wireframe: true,
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.setup.scene?.add(this.mesh);
    // this.mesh.position.x = info.dom.x;
    // this.mesh.position.y = info.dom.y;
    this.mesh.position.z = -1.;

    this.cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipMapNearestFilter,
      // encoding: THREE.sRGBEncoding
    });

    this.cubeCamera = new THREE.CubeCamera(0.1, 10, this.cubeRenderTarget);
  }

  raf() {
    if(!this.setup.renderer || !this.setup.scene) return
    this.cubeCamera?.update(this.setup.renderer, this.setup.scene);
    (this.mesh?.material as any).uniforms.tCube.value = this.cubeRenderTarget?.texture;

  }
}