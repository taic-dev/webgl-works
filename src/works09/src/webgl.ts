import * as THREE from "three";
import vertex from "./shader/vertex.glsl"
import fragment from "./shader/fragment.glsl"
import Mountain from "../src/images/texture.jpg"

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0xffffff,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  static get CAMERA_PARAM() {
    return {
      fov: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 1000.0,
      x: 0.0,
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
    this.uniforms

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(
      new THREE.Color(WebGL.RENDERER_PARAM.clearColor)
    );
    this.renderer.setPixelRatio(window.devicePixelRatio)
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

    const fovRad = (WebGL.CAMERA_PARAM.fov / 2) * (Math.PI / 180)
    const dist = window.innerHeight / 2 / Math.tan(fovRad)

    this.camera.position.z = dist
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
    const loader = new THREE.TextureLoader();
    const texture = loader.load(Mountain)

    this.uniforms = {
      uTexture: { value: texture },
      uImageAspect: { value: 1280 / 1980 },
      uPlaneAspect: { value: 400 / 600 },
      uTime: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 }
    }

    const geo = new THREE.PlaneGeometry(400, 600, 100, 100)
    const mat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    this.plane = new THREE.Mesh(geo, mat);
    this.scene.add(this.plane);

    // ヘルパー
    // this.axesHelper = new THREE.AxesHelper(5.0);
    // this.scene.add(this.axesHelper);

    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      const y = (event.clientY / window.innerHeight) * 2.0 - 1.0;

      this.uniforms.uMouseX.value += x * 2
      this.uniforms.uMouseY.value += -y * 2
      this.uniforms.uTime.value++
    });
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}