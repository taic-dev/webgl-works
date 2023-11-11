import { gsap } from "gsap";
import * as THREE from "three";
import Texture1 from "./image/texture1.jpg";
import Texture2 from "./image/texture2.jpg";
import DisplacementMap from "./image/displacement.png";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0xffffff,
      width: window.document.querySelector(".webgl")?.clientWidth,
      height: window.document.querySelector(".webgl")?.clientHeight,
    };
  }

  static get CAMERA_PARAM() {
    return {
      fov: 50,
      aspect:
        window.document.querySelector(".webgl")?.clientWidth /
        window.document.querySelector(".webgl")?.clientHeight,
      near: 1.0,
      far: 100.0,
      x: 0.0,
      y: 0.0,
      z: 1.0,
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
      intensity: 1,
    };
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.plane;
    this.uniforms;
    this.canvas = window.document.querySelector(".webgl");

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.canvas.addEventListener("mouseenter", () => {
      gsap.fromTo(
        this.uniforms.uOffset,
        { value: 0 },
        { value: 1, duration: 1.8, ease: "expo.out" }
      )
    });

    this.canvas.addEventListener("mouseleave", () => {
      gsap.fromTo(
        this.uniforms.uOffset,
        { value: 1 },
        { value: 0, duration: 1.8, ease: "expo.out" }
      )
    });
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(
      new THREE.Color(WebGL.RENDERER_PARAM.clearColor)
    );
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

    // ライト
    this.directionalLight = new THREE.DirectionalLight(
      WebGL.DIRECTIONAL_LIGHT_PARAM.color,
      WebGL.DIRECTIONAL_LIGHT_PARAM.intensity
    );

    this.directionalLight.position.set(
      WebGL.DIRECTIONAL_LIGHT_PARAM.x,
      WebGL.DIRECTIONAL_LIGHT_PARAM.y,
      WebGL.DIRECTIONAL_LIGHT_PARAM.z
    );
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(
      WebGL.AMBIENT_LIGHT_PARAM.color,
      WebGL.AMBIENT_LIGHT_PARAM.intensity
    );
    this.scene.add(this.ambientLight);

    // plane

    // Ocean Plane
    const loader = new THREE.TextureLoader();

    this.uniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0.3, 0.2, 0.5) },
      uOffset: { value: 0.0 },
      uTexture1: { value: loader.load(Texture1) },
      uTexture2: { value: loader.load(Texture2) },
      uDisplacementTexture: { value: loader.load(DisplacementMap) },
    };

    const planeGeometry = new THREE.PlaneGeometry(1, 1);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

    // コントロール
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    // this.axesHelper = new THREE.AxesHelper(5.0);
    // this.scene.add(this.axesHelper);
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}
