import * as THREE from "three";
import vertex from "./shader/vertex.glsl";
import fragment from "./shader/fragment.glsl";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0xfffffff,
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }

  static get CAMERA_PARAM() {
    return {
      fov: 50,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 100.0,
      x: 0.0,
      y: 0.0,
      z: 10.0,
      lookAt: new THREE.Vector3(),
    }
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.5,
      x: -5.0,
      y: 1.0,
      z: 5.0,
    }
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0x000000,
      intensity: 1,
    }
  }

  constructor() {
    this.renderer
    this.scene
    this.camera
    this.directionalLight
    this.ambientLight
    
    this.geometry
    this.material
    this.mesh
    this.plane
    this.time = 0

    this.color = ["#c9c9c4", "c9c9c2", "#999999",]
    
    this.controls;
    this.axesHelper

    this.render = this.render.bind(this)

    window.addEventListener("resize",()=>{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setClearColor(
      new THREE.Color(WebGL.RENDERER_PARAM.clearColor)
    )
    this.renderer.setSize(
      WebGL.RENDERER_PARAM.width,
      WebGL.RENDERER_PARAM.height,
    )

    const wrapper = document.querySelector(".webgl");
    wrapper?.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new THREE.Scene()

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      WebGL.CAMERA_PARAM.fov,
      WebGL.CAMERA_PARAM.aspect,
      WebGL.CAMERA_PARAM.near,
      WebGL.CAMERA_PARAM.far,
    );

    this.camera.position.set(
      WebGL.CAMERA_PARAM.x,
      WebGL.CAMERA_PARAM.y,
      WebGL.CAMERA_PARAM.z,
    )

    this.camera.lookAt(WebGL.CAMERA_PARAM.lookAt);

    // ライト
    this.directionalLight = new THREE.DirectionalLight(
      WebGL.DIRECTIONAL_LIGHT_PARAM.color,
      WebGL.DIRECTIONAL_LIGHT_PARAM.intensity,
    )

    this.directionalLight.position.set(
      WebGL.DIRECTIONAL_LIGHT_PARAM.x,
      WebGL.DIRECTIONAL_LIGHT_PARAM.y,
      WebGL.DIRECTIONAL_LIGHT_PARAM.z
    )

    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(
      WebGL.AMBIENT_LIGHT_PARAM.color,
      WebGL.AMBIENT_LIGHT_PARAM.intensity,
    )
    this.scene.add(this.ambientLight)

    // plane
    this.geometry = new THREE.PlaneGeometry(100,10,100,100);
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        resolution: { value: new THREE.Vector4() },
        uColor: { value: this.color.map((v: string) => new THREE.Color(v)) }
      },
      // wireframe: true,
      vertexShader: vertex,
      fragmentShader: fragment
    })

    this.plane = new THREE.Mesh(this.geometry, this.material);

    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

    // コントロール
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    // this.axesHelper = new THREE.AxesHelper(5.0);
    // this.scene.add(this.axesHelper);
  }

  render() {
    this.time += 0.0005
    this.material.uniforms.time.value = this.time
    requestAnimationFrame(this.render)
    this.renderer.render(this.scene, this.camera);
  }
}