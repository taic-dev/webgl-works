import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { mouseCoordinate } from "./utils";
import GUI from "lil-gui";

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
  guiValue: any;

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

  _setEffectMesh() {
    this.geometry = new THREE.PlaneGeometry(this.w, this.h);
    this.uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(this.x, this.y) },
      uResolution: { value: new THREE.Vector2(this.w, this.h) },
      uColor: { value: false },
      uSize: { value: 5.0 },
      uSpeed: { value: 0.0001 },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
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

  _setGui() {
    const gui = new GUI();
    this.guiValue = {
      color: false,
      size: 5,
      speed: 0.0005,
    };
    gui.add(this.guiValue, "color");
    gui.add(this.guiValue, "size", 1, 10, 0.1);
    gui.add(this.guiValue, "speed", 0.00001, 0.005, 0.00001);
  }

  _setMouse() {
    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.mesh) return;
      const { x, y } = mouseCoordinate(e);
      (this.mesh.material as any).uniforms.uMouse.value = { x, y };
    });
  }

  _setResize() {
    window.addEventListener("resize", () => {
      setTimeout(() => {
        if(!this.camera) return
        this.renderer?.setPixelRatio(window.devicePixelRatio);
        this.renderer?.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera?.updateProjectionMatrix();
        this.mesh?.scale.set(window.innerWidth, window.innerHeight, 0);
      }, 500)
    });
  }

  init() {
    this._setCanvas();
    this._setCamera();
    this._setEffectMesh();
    this._setGui();
    this._setResize();
    // this._setMouse();
    // this._setHelper();
  }

  render() {
    if (!this.camera || !this.material) return;
    this.renderer?.render(this.scene, this.camera);

    (this.mesh?.material as any).uniforms.uTime.value++;
    this.material.uniforms.uColor.value = this.guiValue.color;
    this.material.uniforms.uSize.value = this.guiValue.size;
    this.material.uniforms.uSpeed.value = this.guiValue.speed;

    requestAnimationFrame(this.render);
  }
}
