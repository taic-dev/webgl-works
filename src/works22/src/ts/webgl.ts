import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from '../shader/vertexShader.glsl'
import fragmentShader from '../shader/fragmetShader.glsl'
import { PARAMS } from "./constants";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.render = this.render.bind(this);
    this.camera
    this.scene = new THREE.Scene();
    this.mesh
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    const element = document.querySelector('.webgl');
    console.log(element)
    element?.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    )

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      PARAMS.CAMERA.POSITION.Z,
    )

    this.camera.lookAt(0, 0, 0)
  }

  _setMesh() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1 )
    this.material = new THREE.MeshBasicMaterial({
      color: 0x66ccff,
      wireframe: true,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _setControl() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  _setAxesHelper() {
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  init() {
    this._setRenderer();
    this._setCamera();
    this._setMesh();
    this._setControl();
    this._setAxesHelper();
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera)
    this.mesh.rotation.y += 0.01
  }
}