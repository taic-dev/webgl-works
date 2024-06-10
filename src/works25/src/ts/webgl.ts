import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { PARAMS } from "./constants";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.ShaderMaterial | undefined;
  uniforms: any;
  mesh: THREE.Mesh | undefined;
  imageElement: HTMLImageElement | null;

  constructor() {
    this.scene = new THREE.Scene();
    this.imageElement =
      document.querySelector<HTMLImageElement>("image__wrapper img");
  }

  setCanvas() {
    const element = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    element?.appendChild(this.renderer.domElement);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );

    const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 100);
    const dist = PARAMS.WINDOW.H / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, dist);
  }

  setMesh() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

    if (!this.imageElement) return;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(this.imageElement.src);

    this.uniforms = {
      uTexture: { value: texture },
      uImageAspect: {
        value: this.imageElement.naturalWidth / this.imageElement.naturalHeight,
      },
      uTextureAspect: {
        value: this.imageElement.clientWidth / this.imageElement.clientHeight,
      },
      uLoading: { value: 0 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    return this.mesh;
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.setMesh();
    this.render();
  }

  render() {
    if (!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  }
}
