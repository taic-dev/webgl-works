import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import brush from './images/burash.png'

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
      z: 20.0,
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

    this.max = 2

    this.geometry;
    this.material;
    this.mesh
    this.meshes = []
    this.plane;

    this.mouse = new THREE.Vector2(0,0)

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();

    window.addEventListener('mousemove', (event) => {
      this.mouse.x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      this.mouse.y = (event.clientY / window.innerHeight) * 2.0 - 1.0;

      console.log(this.mouse.x, this.mouse.y)
    })
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
    this.geometry = new THREE.PlaneGeometry(1, 1);

    for(let i = 0; i < this.max; i++) {
      let n = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(brush),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
      })

      let mesh = new THREE.Mesh(this.geometry, n)
    
      console.log(mesh)
      // mesh.visible = false;
      mesh.rotation.z = 2 * Math.PI * Math.random();
      this.scene.add(mesh);
      this.meshes.push(mesh);
    }

    // this.material = new THREE.MeshPhongMaterial({
    //   color: 0xfffff0f0f,
      
    // });
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.position.set(0, 0, 0);
    // this.scene.add(this.mesh);

    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    this.axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(this.axesHelper);
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);

    this.meshes.forEach((meshe: any) => {
      console.log(this.meshe)
      meshe.position.x = this.mouse.x;
      meshe.position.y = -this.mouse.y;
    });
  }
}