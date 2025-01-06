import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { clientRectCoordinate, getImageAspect, getImageUrl } from "./utils";
import { loadingAnimation, scrollAnimation } from "./animation";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  geometry: THREE.PlaneGeometry | undefined;
  uniforms: any;
  material: THREE.ShaderMaterial | undefined;
  mesh: THREE.Mesh | undefined;
  scene: THREE.Scene;

  images: HTMLElement[];
  planeArray: { img: HTMLElement; mesh: THREE.Mesh }[];

  constructor() {
    this.camera;
    this.geometry;
    this.uniforms;
    this.material;
    this.mesh;
    this.scene = new THREE.Scene();

    this.planeArray = [];
    this.images = [...document.querySelectorAll<HTMLElement>(".image-item__img")];

    this.render = this.render.bind(this);
  }

  setCanvas() {
    const webgl = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    webgl?.appendChild(this.renderer.domElement);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const fovRad = (60 / 2) * (Math.PI / 180);
    const dist = window.innerHeight / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, dist);
  }

  initMesh() {
    this.images.forEach(async (img) => {
      const mesh = await this.setMesh(img);
      this.scene.add(mesh);
      this.setMeshPosition(img, mesh);
      this.planeArray.push({ img, mesh });
    });
  }

  async setMesh(element: HTMLElement) {
    this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);

    const url = getImageUrl(element);
    const imgSize = await getImageAspect(element);
    const loader = new THREE.TextureLoader();

    this.uniforms = {
      uTexture: { value: loader.load(url) },
      uImageAspect: { value: imgSize.w / imgSize.h },
      uPlaneAspect: { value: element.clientWidth / element.clientHeight },
      uLoading: { value: 0 },
      uOffset: { value: { x: 0, y: 0 } },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    return this.mesh;
  }

  setMeshPosition(img: HTMLElement, mesh: THREE.Mesh) {
    const rect = img.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect);

    mesh.position.set(x, y, 1);

    mesh.scale.x = rect.width;
    mesh.scale.y = rect.height;
  }

  _loadingAnimation() {
    this.planeArray.forEach((plane) => {
      loadingAnimation(
        (plane.mesh.material as any).uniforms.uLoading,
        (plane.mesh.material as any).uniforms.uOffset.value
      );
    });
  }

  _scrollAnimation(x: number, y: number) {
    this.planeArray.forEach((plane) => {
      scrollAnimation(
        (plane.mesh.material as any).uniforms.uOffset.value,
        x,
        y
      );
    });
  }

  init() {
    window.addEventListener("load", () => {
      this._loadingAnimation();
    });
    this.setCanvas();
    this.setCamera();
    this.initMesh();
    this.render();
  }

  render() {
    if (!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    this.planeArray.forEach((plane) => {
      this.setMeshPosition(plane.img, plane.mesh);
    });

    requestAnimationFrame(this.render);
  }
}
