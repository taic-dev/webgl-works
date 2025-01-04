import { gsap } from "gsap";
import * as THREE from "three";
import Texture1 from "./image/texture1.jpg";
import Texture2 from "./image/texture2.jpg";
import DisplacementMap1 from "./image/displacement1.png";
import DisplacementMap2 from "./image/displacement2.png";
import DisplacementMap3 from "./image/displacement3.png";
import DisplacementMap4 from "./image/displacement4.png";
import DisplacementMap5 from "./image/displacement5.png";
import DisplacementMap6 from "./image/displacement6.png";
import DisplacementMap7 from "./image/displacement7.png";
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
      aspect: 500 / 700,
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
    this.guiValue;
    this.canvas = window.document.querySelector(".webgl");
    this.DisplacementTexture = "effect1";
    this.DisplacementTextures = {
      effect1: DisplacementMap1,
      effect2: DisplacementMap2,
      effect3: DisplacementMap3,
      effect4: DisplacementMap4,
      effect5: DisplacementMap5,
      effect6: DisplacementMap6,
      effect7: DisplacementMap7,
    };

    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.canvas.addEventListener("mouseenter", () => {
      gsap.fromTo(
        this.uniforms.uOffset,
        { value: 0 },
        { value: 1, duration: 1.8, ease: "expo.out" }
      );
    });

    this.canvas.addEventListener("mouseleave", () => {
      gsap.fromTo(
        this.uniforms.uOffset,
        { value: 1 },
        { value: 0, duration: 1.8, ease: "expo.out" }
      );
    });

    const loader = new THREE.TextureLoader();

    Array.from(window.document.getElementsByName("effect")).map((effect) => {
      effect.addEventListener("click", () => {
        this.DisplacementTexture = effect.getAttribute("value");
        (this.uniforms.uDisplacementTexture.value = loader.load(
          this.DisplacementTextures[this.DisplacementTexture || "effect1"]
        ))
      });
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
      uOffset: { value: 0.0 },
      uTexture1: { value: loader.load(Texture1) },
      uTexture2: { value: loader.load(Texture2) },
      uDisplacementTexture: {
        value: loader.load(
          this.DisplacementTextures[this.DisplacementTexture || "effect1"]
        ),
      },
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
