// import { gsap } from "gsap";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import vertex from "../src/shader/vertex.glsl"
import fragment from "../src/shader/fragment.glsl"
import brush from "./images/burash.png";
import ocean from "./images/ocean.png";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0x000000,
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
      z: 2.0,
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
      color: 0x000000,
      intensity: 1,
    };
  }

  constructor() {
    this.canvas;
    this.renderer;
    this.scene;
    this.scene1;
    this.camera;
    this.directionalLight;
    this.ambientLight;

    this.max = 100;

    this.geometry;
    this.material;
    this.mesh;
    this.meshes = [];
    this.plane;
    this.quad;

    this.oceanGeo
    this.oceanGeoFS
    this.material

    this.mouse = new THREE.Vector2(0, 0);
    this.prevMouse = new THREE.Vector2(0, 0);
    this.currentWave = 0;

    this.baseTexture = new THREE.WebGLRenderTarget(
      window.innerWidth, window.innerHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat
      }
    )

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();

    window.addEventListener("mousemove", (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      this.mouse.y = (event.clientY / window.innerHeight) * 2.0 - 1.0;
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
    this.canvas = wrapper?.firstElementChild;

    // シーン
    this.scene = new THREE.Scene();
    this.scene1 = new THREE.Scene();

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
    this.geometry = new THREE.PlaneGeometry(0.05, 0.05);

    for (let i = 0; i < this.max; i++) {
      let n = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(brush),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      });

      let mesh = new THREE.Mesh(this.geometry, n);

      mesh.visible = false;
      mesh.rotation.z = 2 * Math.PI * Math.random();
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }

    // Ocean Plane
    const loader = new THREE.TextureLoader();
    const texture = loader.load(ocean)

    this.uniforms = {
      uTexture: { value: texture },
      uDisplacement: { value: null },
    }

    this.oceanGeo = new THREE.PlaneGeometry(4, 2, 100, 100)
    this.oceanGeoFS = new THREE.PlaneGeometry(4, 2, 100, 100)
    
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    this.quad = new THREE.Mesh(this.oceanGeoFS, this.material);
    this.scene1.add(this.quad);

    this.plane = new THREE.Mesh(this.oceanGeo, this.material);


    // コントロール
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    // this.axesHelper = new THREE.AxesHelper(5.0);
    // this.scene.add(this.axesHelper);
  }

  setNewWave(x: number, y: number, index: number) {
    let meshe = this.meshes[index]
    meshe.visible = true
    meshe.position.x = x
    meshe.position.y = -y
    meshe.scale.x = meshe.scale.y = 1
    meshe.material.opacity = 1
  }

  trackMousePos() {
    if (
      Math.abs(this.mouse.x - this.prevMouse.x) < 0.005 &&
      Math.abs(this.mouse.y - this.prevMouse.y) < 0.005
    ) {
    } else {
      this.setNewWave(this.mouse.x, this.mouse.y, this.currentWave)
      this.currentWave = (this.currentWave + 1) % this.max
    }

    this.prevMouse.x = this.mouse.x
    this.prevMouse.y = this.mouse.y
  }

  render() {
    this.trackMousePos();
    requestAnimationFrame(this.render);
    this.renderer.setRenderTarget(this.baseTexture)
    this.renderer.render(this.scene, this.camera);
    this.material.uniforms.uDisplacement.value = this.baseTexture.texture
    this.renderer.setRenderTarget(null)
    this.renderer.clear()
    this.renderer.render(this.scene1, this.camera);

    this.meshes.forEach((meshe: any) => {
      // meshe.position.x = this.mouse.x;
      // meshe.position.y = -this.mouse.y;
      meshe.rotation.z += 0.05
      meshe.material.opacity *= 0.98
      meshe.scale.x = 0.98 * meshe.scale.x + 0.15
      meshe.scale.y = meshe.scale.x
    });
  }
}
