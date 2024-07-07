import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MODEL, PARAMS } from "./constants";
import { randomNum } from "./utils";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  controls: OrbitControls | undefined;
  models: THREE.Group[];
  modelSize: { x: number; y: number; z: number };

  constructor() {
    this.camera;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this);
    this.models = [];
    this.modelSize = { x: 0, y: 0, z: 0 };
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

    this.camera.position.set(0, 0, 20);
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(directionalLight);
    directionalLight.position.set(3, 3, 3);
  }

  setMesh() {
    for(let m = 1; m <= 4; m++) {
    for (let i = 1; i <= Object.keys(MODEL.MANZU).length; i++) {
      this.initMesh(MODEL.MANZU[i]);
    }
    for (let i = 1; i <= Object.keys(MODEL.PINZU).length; i++) {
      this.initMesh(MODEL.PINZU[i]);
    }
    for (let i = 1; i <= Object.keys(MODEL.SOZU).length; i++) {
      this.initMesh(MODEL.SOZU[i]);
    }
    for (let i = 1; i <= Object.keys(MODEL.ZIHAI).length; i++) {
      this.initMesh(MODEL.ZIHAI[i]);
    }
    }
  }

  initMesh(model: any) {
    const loader = new GLTFLoader();
    loader.load(
      model,
      async (gltf) => {
        this.scene.add(gltf.scene);
        this.models.push(gltf.scene);
        this.modelSize = this.getMeshSize(gltf.scene);
        gltf.scene.position.set(randomNum(), randomNum(), randomNum());
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }

  getMeshSize(model: any) {
    const box = new THREE.Box3().setFromObject(model);
    const x = box.max.x - box.min.x;
    const y = box.max.y - box.min.y;
    const z = box.max.z - box.min.z;
    return { x, y, z };
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
    this.setHelper();
    this.setMesh();
    this.render();
  }

  render() {
    if (!this.camera) return;
    const radius = 30;
    const modelNum = 34;
    let degree = 0;
    let deg = 360 / modelNum;

    this.renderer?.render(this.scene, this.camera);

    this.models.forEach((model, i) => {
      degree += deg;

      model.rotation.y += 0.002 * (i * 0.01);
      model.rotation.z -= 0.001 * (i * 0.01);

      // 角度をラジアンに変換
      const rad = (degree * Math.PI) / 180;
      const x = radius * Math.cos(rad);
      const y = radius * Math.sin(rad);

      console.log(randomNum());

      if(model.position.y <= -20) {
        model.position.setY(20);
      } else {
        model.position.setY(model.position.y += -0.01);
      }


    });

    requestAnimationFrame(this.render);
  }
}
