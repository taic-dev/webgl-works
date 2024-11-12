import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import effectFragmentShader from "../shader/effectFragmentShader.glsl";
import originalImage from "../image/original-image.webp";
import effectImage from "../image/effect.jpg";
import fireDepthImage from "../image/fire-depth-image.png";
import { mouseCoordinate } from "./utils";

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
  x: number;
  y: number;

  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.x = 0;
    this.y = 0;
    this.aspect = this.w / this.h;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this);
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
    const element = document.querySelector(".card");
    const loader = new THREE.TextureLoader();
    this.geometry = new THREE.PlaneGeometry(
      element?.clientWidth,
      element?.clientHeight
    );
    this.uniforms = {
      uOriginalImage: { value: loader.load(originalImage) },
      uDepthImage: { value: loader.load(fireDepthImage) },
      uMouse: { value: new THREE.Vector2(this.x, this.y) },
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

  _setEffectMesh() {
    const element = document.querySelector(".card");
    const loader = new THREE.TextureLoader();
    this.geometry = new THREE.PlaneGeometry(
      element?.clientWidth,
      element?.clientHeight
    );
    this.uniforms = {
      uTime: { value: 0 },
      uEffectImage: { value: loader.load(effectImage) },
      uMouse: { value: new THREE.Vector2(this.x, this.y) },
      uResolution: { value: new THREE.Vector2(this.w, this.h) },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader: effectFragmentShader,
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

  _setMouse() {
    const element = document.querySelector<HTMLElement>(".card")!;
    element.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.mesh) return;
      const { x, y } = mouseCoordinate(e);
      (this.mesh.material as any).uniforms.uMouse.value = { x, y };
      this.mesh?.rotation.set(y, -x, 0);
    });

    element?.addEventListener("mouseleave", () => {
      if (!this.mesh) return;
      (this.mesh.material as any).uniforms.uMouse.value.x = 0;
      (this.mesh.material as any).uniforms.uMouse.value.y = 0;
      this.mesh?.rotation.set(0, 0, 0);
    });
  }

  init() {
    this._setCanvas();
    this._setCamera();
    // this._setMesh();
    this._setEffectMesh();
    this._setHelper();
    this._setMouse();
  }

  render() {
    if (!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    (this.mesh?.material as any).uniforms.uTime.value++;
    

    console.log((this.mesh.material as any).uniforms.uMouse.value)
    requestAnimationFrame(this.render);
  }
}
