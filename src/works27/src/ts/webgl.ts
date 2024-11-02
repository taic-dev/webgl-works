import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

export class Webgl {
  w: number;
  h: number;
  aspect: number;
  renderer: THREE.WebGLRenderer | undefined;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | undefined;
  uniforms: any;
  material: THREE.ShaderMaterial | undefined;
  geometry: THREE.PlaneGeometry | undefined;
  mesh: THREE.Mesh | undefined;
  controls: OrbitControls | undefined;

  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.aspect = this.w / this.h;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this)
  }

  _setCanvas() {
    const element = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.w, this.h);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    element?.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(60, this.aspect, 1, 1000);
    const fovRad = (60 / 2) * (Math.PI / 180);
    const dist = this.h / 2 / Math.tan(fovRad);
    this.camera.position.set(0, 0, dist);
  }

  _setMesh() {
    this.geometry = new THREE.PlaneGeometry(this.w, this.h);
    this.uniforms = {
      uResolution: { value: new THREE.Vector2(this.w, this.h) },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _setHelper() {
    if (!this.camera) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene.add(axesHelper);
  }

  init() {
    this._setCanvas();
    this._setCamera();
    this._setMesh();
    this._setHelper();
  }

  render() {
    if(!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    requestAnimationFrame(this.render)
  }
}
