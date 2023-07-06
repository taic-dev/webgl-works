import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from "lil-gui";

window.addEventListener('DOMContentLoaded', () => {
  const app = new App3();
  app.init();
  app.render();
}, false);

class App3 {
  static get CAMERA_PARAM() {
    return {
      fovy: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 100.0,
      x: 5.0,
      y: 0.0,
      z: 0.0,
      lookAt: new THREE.Vector3(0.0, 0.0, 0.0)
    };
  }

  static get RENDERER_PARAM() {
    return {
      clearColor: 0xf5f5f5,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 1.0,
      x: 8.0,
      y: 0.0,
      z: 0.0,
    }
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.8,
    }
  }

  static get MAIN_MATERIAL_PARAM() {
    return {
      color: 0xc0c0c0,
    }
  }

  static get MATERIAL_PARAM() {
    return {
      color: 0x4169e1,
    }
  }

  static Coordinate(degree, radius) {
    // 角度をラジアンに変換
    const rad = degree * Math.PI / 180;
    // X座標
    const x = radius * Math.tan(rad);
    // Y座標
    const y = radius * Math.sin(rad);
    // Z座標
    const z = radius * Math.cos(rad);
    return { x, y, z }
  }

  static RandomNum(min, max) {
    return Math.random() * ( max - min ) + min;
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.mainMaterial
    this.material;
    this.mainBox;
    this.box;
    this.boxArray=[];
    this.mainBoxGeometry;
    this.boxGeometry;
    this.degree = 0;
    this.radius = 0.1;
    this.isDown;
    this.controls;
    this.guiValue;
    this.render = this.render.bind(this);

    window.addEventListener("keydown",(keyEvent)=>{
      if(keyEvent.key === " "){
        this.isDown = true;
      }
    }, false);
    window.addEventListener("keyup",(keyEvent)=>{
      this.isDown = false;
    }, false);
    window.addEventListener("resize",()=>{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);
  }
  
  // 初期化処理
  init() {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setClearColor(new THREE.Color(App3.RENDERER_PARAM.clearColor));
    this.renderer.setSize(App3.RENDERER_PARAM.width, App3.RENDERER_PARAM.height);
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
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

    // ディレクショナルライト
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

    // アンビエントライト
    this.ambientLight = new THREE.AmbientLight(
      App3.AMBIENT_LIGHT_PARAM.color,
      App3.AMBIENT_LIGHT_PARAM.intensity,
    )
    this.scene.add(this.directionalLight);

    
    // メインMesh
    this.mainMaterial = new THREE.MeshPhongMaterial(App3.MAIN_MATERIAL_PARAM);
    this.mainMaterial.transparent=true;
    this.mainMaterial.opacity=0.8;
    this.mainBoxGeometry = new THREE.DodecahedronGeometry(0.5 ,0);
    this.mainBox = new THREE.Mesh(this.mainBoxGeometry, this.mainMaterial);
    this.scene.add(this.mainBox);
    
    // 周りを回るMesh
    for(let i=0; i<500; i++){
      this.material = new THREE.MeshPhongMaterial(App3.MATERIAL_PARAM);
      this.material.transparent=true;
      this.material.opacity=0.8;
      this.boxGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      this.box = new THREE.Mesh(this.boxGeometry, this.material);
      this.degree = App3.RandomNum(0, 360);
      this.radius = App3.RandomNum(1.1, 5);
      const { x, y, z } = App3.Coordinate(this.degree, this.radius);
      this.box.position.set(x,y,z);
      this.scene.add(this.box);
      this.boxArray.push({ box: this.box, degree: this.degree, radius: this.radius, material: this.material});
    }

    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const gui = new GUI();
    this.guiValue = {
      DodecahedronColor: App3.MAIN_MATERIAL_PARAM.color,
      BoxColor: App3.MATERIAL_PARAM.color
    }
    gui.addColor(this.guiValue, 'DodecahedronColor');
    gui.addColor(this.guiValue, 'BoxColor');

    // ヘルパー
    // const axesBarLength = 5.0;
    // this.axesHelper = new THREE.AxesHelper(axesBarLength);
    // this.scene.add(this.axesHelper);
  }

  render() {
    requestAnimationFrame(this.render);
    this.controls.update();

    this.mainBox.rotation.x -= 0.01
    this.mainBox.rotation.y -= 0.01
    this.degree = App3.RandomNum(0, 360);
    this.radius = App3.RandomNum(1.1, 5);

    this.boxArray.forEach((boxInfo)=>{
      boxInfo.box.rotation.x += 0.01;
      boxInfo.box.rotation.y += 0.01;
      
      boxInfo.degree += 0.2
      let { x, y, z } = App3.Coordinate(boxInfo.degree, boxInfo.radius);
      boxInfo.box.position.set(x,y,z);
      // 色の変更
      boxInfo.material.color.set(this.guiValue.BoxColor);
    });

    if(this.isDown) {
      this.mainBox.rotation.x -= 0.1
      this.mainBox.rotation.y -= 0.1

      this.boxArray.forEach((boxInfo)=>{
        boxInfo.box.rotation.x += 0.1;
        boxInfo.box.rotation.y += 0.1;
        
        boxInfo.degree += 0.5
        let { x, y, z } = App3.Coordinate(boxInfo.degree, boxInfo.radius);
        boxInfo.box.position.set(x,y,z);
      });
    }

    // 色の変更
    this.mainMaterial.color.set(this.guiValue.DodecahedronColor);

    this.renderer.render(this.scene, this.camera);
  }
}