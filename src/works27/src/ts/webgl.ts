import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import Text1 from "../image/oku.png";

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
  image: HTMLImageElement

  constructor() {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.aspect = this.w / this.h;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this)

    this.image = document.querySelector<HTMLImageElement>('.text__image')!;
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
    const rect = this.image.getBoundingClientRect();
    
    const loader = new THREE.TextureLoader();
    const fontImage = loader.load(Text1);
    this.geometry = new THREE.PlaneGeometry(this.image.clientWidth, this.image.clientHeight, 10, 10);
    this.uniforms = {
      uFontTexture: { value: fontImage },
      uFontTextureAspect: { value: this.image.naturalWidth / this.image.naturalHeight },
      uPlaneAspect: { value: this.image.clientWidth / this.image.clientHeight },
      uResolution: { value: new THREE.Vector2(this.image.clientWidth, this.image.clientHeight) },
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
