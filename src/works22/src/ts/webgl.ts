import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmetShader.glsl";
import { PARAMS } from "./constants";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.render = this.render.bind(this);
    this.camera;
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.mesh;
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setClearColor({ color: 0x22222 })
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    const element = document.querySelector(".webgl");
    element?.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      PARAMS.CAMERA.POSITION.Z
    );

    this.camera.lookAt(0, 0, 0);
  }

  _setMesh() {
    this.geometry = new THREE.TorusKnotGeometry(4, 1.3, 100, 16);
    const torusKnot = new THREE.Mesh(this.geometry);
    this.sampler = new MeshSurfaceSampler(torusKnot).build();

    const vertices = [];
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < 15000; i++) {
      this.sampler.sample(tempPosition);
      vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
    }

    this.pointGeometry = new THREE.BufferGeometry();
    this.pointGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.pointMaterial = new THREE.PointsMaterial({
      color: 0x66ccff,
      size: 0.03,
    });
    this.points = new THREE.Points(this.pointGeometry, this.pointMaterial);
    this.group.add(this.points);
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
    this.renderer.render(this.scene, this.camera);
    this.group.rotation.y += 0.01;
  }
}
