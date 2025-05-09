import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

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
      fov: 50,
      aspect: window.innerWidth / window.innerHeight,
      near: 1.0,
      far: 1000.0,
      x: 0.0,
      y: 0.0,
      z: 1,
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
    this.material;
    this.time = 0;
    this.x;
    this.y;

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();

    window.addEventListener("pointermove", (event) => {
      this.material.uniforms.mouseX =
        (event.clientX / window.innerWidth) * 2.0 - 1.0;
      this.material.uniforms.mouseY =
        (event.clientY / window.innerHeight) * 2.0 - 1.0;
    });

    window.addEventListener(
      "resize",
      () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      false
    );
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
    // const loader = new THREE.TextureLoader();
    const planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        mouseX: { value: 0.0 },
        mouseY: { value: 0.0 },
        resolution: { value: { x: window.innerWidth, y: window.innerHeight } },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.plane = new THREE.Mesh(planeGeometry, this.material);
    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

    // 画面のリサイズ
    window.addEventListener("resize", () => {
      this.renderer?.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera?.updateProjectionMatrix();
      this.material.uniforms.resolution.value = { x: window.innerWidth, y: window.innerHeight }
    });
  }

  render() {
    requestAnimationFrame(this.render);
    this.time += 0.01;
    this.material.uniforms.time.value = this.time;
    this.renderer.render(this.scene, this.camera);
  }
}
