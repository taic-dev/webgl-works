// import { gsap } from "gsap";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import HeightTexture from "./images/heightTexture2.png";
import Mountainside from "./images/texture.png";
import AlphaTexture from "./images/alphaTexure.png";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  static get CAMERA_PARAM() {
    return {
      fov: 50,
      aspect: window.innerWidth / window.innerHeight,
      near: 1.0,
      far: 1000.0,
      x: 2.0,
      y: 0.0,
      z: 5.0,
      lookAt: new THREE.Vector3(),
    };
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.5,
      x: -5.0,
      y: 1.0,
      z: 5.0,
    };
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.9,
    };
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.plane;
    this.pointLight;

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();

    window.addEventListener("pointermove", (event) => {
      const y = (event.clientY / window.innerHeight) * 2.0 - 1.0;

      this.plane.material.displacementScale = y;
    });
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(
      WebGL.RENDERER_PARAM.width,
      WebGL.RENDERER_PARAM.height
    );
    const wrapper = document.querySelector(".webgl");
    wrapper?.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      WebGL.CAMERA_PARAM.fov,
      WebGL.CAMERA_PARAM.aspect,
      WebGL.CAMERA_PARAM.near,
      WebGL.CAMERA_PARAM.far
    );

    this.camera.position.set(
      WebGL.CAMERA_PARAM.x,
      WebGL.CAMERA_PARAM.y,
      WebGL.CAMERA_PARAM.z
    );

    this.camera.lookAt(WebGL.CAMERA_PARAM.lookAt);

    this.ambientLight = new THREE.AmbientLight(
      WebGL.AMBIENT_LIGHT_PARAM.color,
      WebGL.AMBIENT_LIGHT_PARAM.intensity
    );
    this.scene.add(this.ambientLight);

    // PointLight
    this.pointLight = new THREE.PointLight("#00b3ff", 2);
    this.pointLight.x = 2;
    this.pointLight.y = 10;
    this.pointLight.z = 0.4;
    this.scene.add(this.pointLight);

    // plane
    const loader = new THREE.TextureLoader();
    const texture = loader.load(Mountainside);
    const heightTexture = loader.load(HeightTexture);
    const alphaTexture = loader.load(AlphaTexture);
    const planeGeometry = new THREE.PlaneGeometry(3, 3, 64, 64);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: "#00b3ff",
      map: texture,
      displacementMap: heightTexture,
      displacementScale: 0.6,
      alphaMap: alphaTexture,
      transparent: true,
      depthTest: false,
    });
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.position.set(0, 0, 0);
    this.plane.rotation.x = 181;
    this.scene.add(this.plane);

    // 画面のリサイズ
    window.addEventListener("resize", () => {
      this.renderer?.setPixelRatio(window.devicePixelRatio);
      this.renderer?.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera?.updateProjectionMatrix();
    });
  }

  render() {
    requestAnimationFrame(this.render);
    this.plane.rotation.z += 0.003;
    this.renderer.render(this.scene, this.camera);
  }
}
