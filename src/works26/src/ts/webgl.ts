import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MODEL, PARAMS } from "./constants";
import { randomNum } from "./utils";
import { firstAnimation, inhaleAnimation, vomitAnimation } from "./animation";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  controls: OrbitControls | undefined;
  models: THREE.Group[];
  uniforms: any;
  material: THREE.ShaderMaterial | undefined;
  modelSize: { x: number; y: number; z: number };
  inhaleElement: HTMLElement | null;
  vomitElement: HTMLElement | null;
  isAnimated: boolean

  constructor() {
    this.camera;
    this.scene = new THREE.Scene();
    this.render = this.render.bind(this);
    this.models = [];
    this.modelSize = { x: 0, y: 0, z: 0 };

    this.inhaleElement = document.getElementById("inhale");
    this.vomitElement = document.getElementById("vomit");
    this.isAnimated = false
  }

  setCanvas() {
    const element = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor('#008036')
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

    this.camera.position.set(0, 0, 15);
  }

  setLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    this.scene.add(directionalLight);
    directionalLight.position.set(3, 3, 3);
  }

  setMesh() {
    for (let m = 1; m <= 4; m++) {
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
        this.modelSize = {
          x: gltf.scene.scale.x,
          y: gltf.scene.scale.y,
          z: gltf.scene.scale.z,
        };
        gltf.scene.scale.set(0, 0, 0);
        gltf.scene.rotation.set(0, 0, randomNum(10, 0));
        gltf.scene.position.set(
          randomNum(20, 20),
          randomNum(25, 25),
          randomNum(10, 10)
        );

        this.uniforms = {
          resolution: this.modelSize,
          uTexture: { value: (gltf.scene.children[1] as any).material.map }
        }
    
        this.material = new THREE.ShaderMaterial({
          uniforms: this.uniforms,
          vertexShader,
          fragmentShader
        })

        // gltf.scene.children[1].material = this.material
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

  animation() {
    window.addEventListener("load", () => {
      setTimeout(() => {
        this.models.forEach((model) => {
          firstAnimation(model, this.modelSize);
        });
      }, 1000);
    });

    this.inhaleElement?.addEventListener("click", () => {
      this.models.forEach((model) => {
        inhaleAnimation(model);
      });
    });

    this.vomitElement?.addEventListener('click', () => {
      this.models.forEach((model) => {
        vomitAnimation(model);
      });
    })
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.setLight();
    this.setHelper();
    this.setMesh();
    this.animation();
    this.render();
  }

  render() {
    if (!this.camera) return;
    // const radius = 30;
    const modelNum = 34;
    let degree = 0;
    let deg = 360 / modelNum;

    this.renderer?.render(this.scene, this.camera);

    this.models.forEach((model, i) => {
      degree += deg;

      model.rotation.y += 0.002 * (i * 0.01);
      model.rotation.z -= 0.001 * (i * 0.01);

      // 角度をラジアンに変換
      // const rad = (degree * Math.PI) / 180;
      // const x = radius * Math.cos(rad);
      // const y = radius * Math.sin(rad);

      if (model.position.y <= -25) {
        model.position.setY(25);
      } else {
        model.position.setY((model.position.y += -0.01));
      }
    });

    requestAnimationFrame(this.render);
  }
}
