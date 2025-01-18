import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PARAMS } from "../utils/constants";
import GUI from "lil-gui";

export class Setup {
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  loader: THREE.TextureLoader;
  controls: OrbitControls | null;
  guiValue: any;

  constructor() {
    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.controls = null;
    this.loader = new THREE.TextureLoader();

    this.init();
  }

  init() {
    this.setRenderer();
    this.setScene();
    this.setCamera();
    this.setGui();
    // this.setHelper();
  }

  setRenderer() {
    const element = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    element?.appendChild(this.renderer.domElement);
  }

  setScene() {
    this.scene = new THREE.Scene();
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

    this.camera.position.set(0, 0, 1);
  }

  setGui() {
    const gui = new GUI();
    this.guiValue = {
      color1: 0.2,
      color2: 0.2667,
      color3: 0.4706
    };
    gui.add(this.guiValue, "color1", 0, 1, 0.0001);
    gui.add(this.guiValue, "color2", 0, 1, 0.0001);
    gui.add(this.guiValue, "color3", 0, 1, 0.0001);
  }

  setHelper() {
    if (!this.camera) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.2;

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene?.add(axesHelper);
  }

  resize() {
    if (!this.camera) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera?.updateProjectionMatrix();
    this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
  }
}
