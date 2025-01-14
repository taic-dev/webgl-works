import "../assets/css/style.css"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

window.addEventListener("DOMContentLoaded", ()=>{
  const app = new App3();
  app.init();
  app.render();
});

class App3 {
  static get CAMERA_PARAM() {
    return {
      fovy: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 100.0,
      x: 0.0,
      y: 5.5,
      z: 8.5,
      lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    }
  }

  static get RENDERER_PARAM() {
    return {
      clearColor: 0x333333,
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 1.0,
      x: 1.0,
      y: 1.0,
      z: 1.0,
    }
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.2,
    }
  }

  static get MATERIAL_PARAM() {
    return {
      color: 0x4169e1,
    }
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.material;
    
    this.wing1
    this.wing1Geometry;
    this.wing2
    this.wing2Geometry;
    this.wingArray;
    this.wingCore;
    this.wingCoreGeometry;
    this.wingGroup;

    this.cylinder
    this.cylinderGeometry;
    this.cylinderBottom;
    this.cylinderBottomGeometry;
    this.cylinderMain;
    this.cylinderMainGeometry;
    this.cylinderGroup;
    
    this.wingRotation = true;
    this.mainRotation = true;
    this.vectorY = false;
    this.controls;
    this.axesHelper;
    this.gui;

    this.render = this.render.bind(this);

    window.addEventListener("resize",()=>{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    })
  }

  init() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(App3.RENDERER_PARAM.clearColor));
    this.renderer.setSize(App3.RENDERER_PARAM.width, App3.RENDERER_PARAM.height);
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      App3.CAMERA_PARAM.fovy,
      App3.CAMERA_PARAM.aspect,
      App3.CAMERA_PARAM.near,
      App3.CAMERA_PARAM.far,
    );

    this.camera.position.set(
      App3.CAMERA_PARAM.x,
      App3.CAMERA_PARAM.y,
      App3.CAMERA_PARAM.z,
    )
    this.camera.lookAt(App3.CAMERA_PARAM.lookAt);

    this.directionalLight = new THREE.DirectionalLight(
      App3.DIRECTIONAL_LIGHT_PARAM.color,
      App3.DIRECTIONAL_LIGHT_PARAM.intensity,
    )
    this.directionalLight.position.set(
      App3.DIRECTIONAL_LIGHT_PARAM.x,
      App3.DIRECTIONAL_LIGHT_PARAM.y,
      App3.DIRECTIONAL_LIGHT_PARAM.z,
    )
    this.scene.add(this.directionalLight);

    this.ambientLight = new  THREE.AmbientLight(
      App3.AMBIENT_LIGHT_PARAM.color,
      App3.AMBIENT_LIGHT_PARAM.intensity,
    )
    this.scene.add(this.directionalLight);

    this.wingGroup = new THREE.Group();
    this.cylinderGroup = new THREE.Group();
    this.material = new THREE.MeshPhongMaterial(App3.MATERIAL_PARAM);
    // 扇風機の土台
    this.cylinderBottomGeometry = new THREE.CylinderGeometry(1.3, 1.8, 0.3, 10);
    this.cylinderBottom = new THREE.Mesh(this.cylinderBottomGeometry, this.material);
    this.cylinderGroup.add(this.cylinderBottom);

    // 扇風機の柱
    this.cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 64)
    this.cylinder = new THREE.Mesh(this.cylinderGeometry, this.material);
    this.cylinder.position.set(0, 1.5, 0)
    this.cylinderGroup.add(this.cylinder);

    // 扇風機のメイン
    this.cylinderMainGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.8, 10)
    this.cylinderMain = new THREE.Mesh(this.cylinderMainGeometry, this.material);
    this.cylinderMain.position.set(0, 3.0, 0);
    this.cylinderMain.rotation.set(Math.PI/2, 0, 0);
    this.cylinderGroup.add(this.cylinderMain);

    // 羽のコア
    // this.wingCoreGeometry = new THREE.CylinderGeometry(1.5, 2.0, 0.3, 10);
    this.wingCoreGeometry = new THREE.CylinderGeometry(0.3, 0.1, 0.5, 64);
    this.wingCore = new THREE.Mesh(this.wingCoreGeometry, this.material);
    this.wingCore.position.set(0, 3.0, 0.3);
    this.wingCore.rotation.set(Math.PI/2, 0, 0)
    this.wingGroup.add(this.wingCore);
    
    // 羽
    this.wing1Geometry = new THREE.BoxGeometry(3.0, 0.1, 0.1);
    this.wing1 = new THREE.Mesh(this.wing1Geometry, this.material);
    this.wing1.position.set(0, 3.0, 0.5)
    this.wingGroup.add(this.wing1);

    this.wing2Geometry = new THREE.BoxGeometry(3.0, 0.1, 0.1);
    this.wing2 = new THREE.Mesh(this.wing2Geometry, this.material);
    this.wing2.position.set(0, 3.0, 0.5)
    this.wing2.rotation.z = Math.PI/2;
    this.wingGroup.add(this.wing2);

    this.cylinderGroup.add(this.wingGroup);
    this.cylinderGroup.position.y = -1.8;
    this.scene.add(this.cylinderGroup);

    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    // const axesBarLength = 5.0;
    // this.axesHelper = new THREE.AxesHelper(axesBarLength);
    // this.scene.add(this.axesHelper);

    const gui = new GUI();
    this.guiValue = {
      mainRotation: this.mainRotation,
      wingRotation: this.wingRotation,
    }
    gui.add(this.guiValue, "mainRotation");
    gui.add(this.guiValue, "wingRotation");
    gui.close();
  }

  render() {
    requestAnimationFrame(this.render);
    this.controls.update();

    if(this.guiValue.mainRotation) {
      if(this.cylinderGroup.rotation.y >= 1) {
        this.vectorY = false;
      }
  
      if(this.cylinderGroup.rotation.y <= -1) {
        this.vectorY = true;
      }
      this.vectorY ? this.cylinderGroup.rotation.y += 0.005 : this.cylinderGroup.rotation.y -= 0.005;
    }

    if(this.wingRotation) {
      this.wing1.rotation.z += this.guiValue.wingRotation;
      this.wing2.rotation.z += this.guiValue.wingRotation;
    }
    
    this.renderer.render(this.scene, this.camera);
  }
}