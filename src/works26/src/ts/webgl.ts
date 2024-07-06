import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PARAMS } from "./constants";
import manzu1 from './manzu1.gltf';

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  controls: OrbitControls | undefined;
  model: THREE.Group | undefined; 

  constructor() {
    this.camera
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this);
  }

  setCanvas() {
    const element = document.querySelector(".webgl");
    // this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer = new THREE.WebGLRenderer();
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

    // const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 180);
    // const dist = window.innerHeight / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, 10);
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
    this.scene.add(directionalLight);
    directionalLight.position.set(3., 3., 3.)
  }

  initMesh() {
    const loader = new GLTFLoader();
    loader.load(
      manzu1,
      async (gltf) => {
        this.scene.add(gltf.scene);
        this.model = gltf.scene;
        gltf.scene.position.set(0, 0, 0);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  setHelper() {
    if (!this.camera) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene.add(axesHelper);
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.setLight();
    this.initMesh();
    this.setHelper();
    this.render();
  }

  render() {
    if (!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    if(this.model) {
      this.model.rotation.y += 0.002;
      this.model.rotation.z += 0.002;
    }

    requestAnimationFrame(this.render);
  }
}
