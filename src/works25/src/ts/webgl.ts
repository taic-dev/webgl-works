import gsap from "gsap";
import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import cardBack from "../img/card-bg.png";
import { EASING, PARAMS } from "./constants";
import { clientRectCoordinate, mouseCoordinate } from "./utils";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.ShaderMaterial | undefined;
  uniforms: any;
  mesh: THREE.Mesh | undefined;
  clock: THREE.Clock | undefined;
  imageElement: HTMLImageElement | null;
  controls: OrbitControls | undefined;
  mouse: THREE.Vector2;

  constructor() {
    this.camera;
    this.geometry;
    this.uniforms;
    this.material;
    this.mesh;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.imageElement = document.querySelector<HTMLImageElement>(
      ".image__wrapper img"
    );
    this.controls;
    this.mouse = new THREE.Vector2();

    this.render = this.render.bind(this);
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

    const fovRad = (60 / 2) * (Math.PI / 180);
    const dist = window.innerHeight / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, dist);
  }

  setMesh() {
    if (!this.imageElement) return;
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

    const loader = new THREE.TextureLoader();
    const textureFront = loader.load(this.imageElement.src);
    const textureBack = loader.load(cardBack);

    this.uniforms = {
      uResolution: {
        value: {
          x: this.imageElement.clientWidth,
          y: this.imageElement.clientHeight,
        },
      },
      uMouse: { value: { x: 0, y: 0 } },
      uTextureFront: { value: textureFront },
      uTextureBack: { value: textureBack },
      uImageAspect: {
        value: this.imageElement.naturalWidth / this.imageElement.naturalHeight,
      },
      uPlaneAspect: {
        value: this.imageElement.clientWidth / this.imageElement.clientHeight,
      },
      uLoading: { value: 0 },
      uTime: { value: 0 },
      uEffect: { value: 1 },
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

  setMeshPosition() {
    if (!this.imageElement || !this.mesh) return;

    const rect = this.imageElement.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect);

    this.mesh.position.set(x, y, 1);

    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;
  }

  moveMouseEvent() {
    this.imageElement?.addEventListener("mousemove", (e) => {
      if (!this.imageElement || !this.mesh) return;

      const { x, y } = mouseCoordinate(e, this.imageElement);

      (this.mesh.material as any).uniforms.uMouse.value = { x, y };

      gsap.to(this.mesh.rotation, {
        x: y * 0.7,
        y: -x * 0.7,
        duration: 0.5,
        ease: "power1.out",
      });
    });

    this.imageElement?.addEventListener("mouseleave", (e) => {
      if (!this.mesh) return;

      gsap.to(this.mesh.rotation, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: EASING.transform
      });
    })
  }

  setHelper() {
    if (!this.camera) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene.add(axesHelper);
  }

  onResize() {
    setTimeout(() => {
      if (!this.camera) return;
      this.renderer?.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, 500);
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.setMesh();
    this.moveMouseEvent();
    this.setHelper();
  }

  render() {
    if (!this.camera || !this.mesh || !this.controls) return;
    this.renderer?.render(this.scene, this.camera);

    const time = this.clock?.getElapsedTime();
    (this.mesh.material as any).uniforms.uTime.value = time;

    this.controls.update();
    this.setMeshPosition();

    requestAnimationFrame(this.render);
  }
}
