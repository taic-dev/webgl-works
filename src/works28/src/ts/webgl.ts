import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import face from "../image/mountain.png";
import displacement from "../image/mountain-displacement.png";
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
  image: HTMLImageElement;
  clock: THREE.Clock;
  elapsedTime: number;
  deltaTime: number;
  time: number | undefined;

  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.aspect = this.w / this.h;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this);

    this.image = document.querySelector<HTMLImageElement>(".image")!;
    this.clock = new THREE.Clock();
    this.elapsedTime = 0;
    this.deltaTime = 0;
    this.time = this.clock.getElapsedTime();
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
    const loader = new THREE.TextureLoader();
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.uniforms = {
      uDisplacement: { value: loader.load(displacement) },
      uTexture: { value: loader.load(face) },
      uTextureSize: {
        value: new THREE.Vector2(
          this.image.naturalWidth,
          this.image.naturalHeight
        ),
      },
      uPlaneSize: {
        value: new THREE.Vector2(
          this.image.clientWidth,
          this.image.clientHeight
        ),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uTime: { value: this.time },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _setMeshScale() {
    if(!this.mesh) return;
    this.mesh.scale.x = this.image.clientWidth;
    this.mesh.scale.y = this.image.clientHeight;
    (this.mesh.material as any).uniforms.uPlaneSize.value.x = this.image.clientWidth;
    (this.mesh.material as any).uniforms.uPlaneSize.value.y = this.image.clientHeight;
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
    window.addEventListener("mousemove", (e: MouseEvent) => {
      if (!this.mesh) return;
      const { x, y } = mouseCoordinate(e);

      gsap.to((this.mesh.material as any).uniforms.uMouse.value, {
        duration: 1,
        ease: "power1.out",
        x,
        y,
      });
    });
  }

  _setResize() {
    window.addEventListener("resize", () => {
      if (!this.camera) return;
      this.renderer?.setPixelRatio(window.devicePixelRatio);
      this.renderer?.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera?.updateProjectionMatrix();

      this._setMeshScale();
    });
  }

  init() {
    this._setCanvas();
    this._setCamera();
    this._setMesh();
    this._setMeshScale();
    // this._setHelper();
    this._setMouse();
    this._setResize();
  }

  render() {
    if (!this.camera || !this.material) return;
    this.renderer?.render(this.scene, this.camera);

    this.elapsedTime = this.clock.getElapsedTime();
    this.deltaTime = this.clock.getDelta();

    this.material.uniforms.uTime.value = this.elapsedTime;

    requestAnimationFrame(this.render);
  }
}
