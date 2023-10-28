import * as THREE from "three";
import Lenis from "@studio-freight/lenis";
import cardImage from "./img/card.png";

window.addEventListener("DOMContentLoaded",()=>{
  const lenis = new Lenis()

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  const app = new App3;
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
      y: 0.0,
      z: 4.0,
      lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    }
  }

  static get RENDERER_PARAM() {
    return {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      clearColor: 0xffffff,
      intensity: 1.3,
      x: 0,
      y: 1.0,
      z: 1.0,
    }
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.8,
    }
  }

  static get MATERIAL_PARAM() {
    return {
      color: 0xffffff,
      map: new THREE.TextureLoader().load(cardImage),
    }
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.material;
    this.card;
    this.controls;
    this.boxGeometry;
    this.axesHelper
    this.render = this.render.bind(this);

    window.addEventListener("resize",()=>{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, false);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true,});
    this.renderer.setClearColor(new THREE.Color(App3.RENDERER_PARAM.clearColor), 0);
    this.renderer.setSize(App3.RENDERER_PARAM.width, App3.RENDERER_PARAM.height);
    const wrapper = document.querySelector("#webgl");
    wrapper.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      App3.CAMERA_PARAM.fovy,
      App3.CAMERA_PARAM.aspect,
      App3.CAMERA_PARAM.near,
      App3.CAMERA_PARAM.far,
    )
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

    this.ambientLight = new THREE.AmbientLight(
      App3.AMBIENT_LIGHT_PARAM.color,
      App3.AMBIENT_LIGHT_PARAM.intensity,
    )
    this.scene.add(this.directionalLight);

    this.material = new THREE.MeshPhongMaterial(App3.MATERIAL_PARAM);
    this.material.shininess = 100;
    this.boxGeometry = new THREE.BoxGeometry(1.2, 2.0, 0.02);
    this.card = new THREE.Mesh(this.boxGeometry, this.material);
    this.card.rotation.z = -0.5;
    this.scene.add(this.card);
  }

  render() {
    requestAnimationFrame(this.render);
    
    window.addEventListener("scroll", () => {
      this.card.position.y = window.scrollY * 0.005;
      this.card.rotation.x = -window.scrollY * 0.005;
    })
    this.card.rotation.y += 0.005;


    this.renderer.render(this.scene ,this.camera);
  }
}