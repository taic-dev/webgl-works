import * as THREE from "three";
import { Webgl } from "./webgl";
import { PARAMS } from "./params";

export class Slider {
  [x: string]: any;

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.ambientLight;
    this.directionalLight;
    this.geometry;
    this.material;
    this.mesh;

    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);
  }

  init() {
    const webgl = new Webgl();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector(".webgl")?.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    this.camera = webgl.createCamera(PARAMS.CAMERA_PARAMS);
    this.camera.position.set(
      PARAMS.CAMERA_POSITION_PARAMS.X,
      PARAMS.CAMERA_POSITION_PARAMS.Y,
      PARAMS.CAMERA_POSITION_PARAMS.Z
    );

    this.ambientLight = webgl.createAmbientLight(
      PARAMS.AMBIENT_LIGHT.LIGHT_COLOR,
      PARAMS.AMBIENT_LIGHT.INTENSITY
    );
    this.directionalLight = webgl.createDirectionalLight(
      PARAMS.DIRECTIONAL_LIGHT.LIGHT_COLOR,
      PARAMS.DIRECTIONAL_LIGHT.INTENSITY
    );

    this.geometry = webgl.createPlaneGeometry(
      PARAMS.PLANE_GEOMETRY.W,
      PARAMS.PLANE_GEOMETRY.Y
    );
    this.material = webgl.createMaterial({ color: PARAMS.MATERIAL.COLOR });
    this.mesh = webgl.createMesh(this.geometry, this.material);

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.mesh);
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}
