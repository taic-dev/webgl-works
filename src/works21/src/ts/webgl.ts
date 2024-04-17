import * as THREE from "three";
import { PARAMS } from "./params";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { Controller } from "./controller";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer;
    this.camera;
    this.geometry;
    this.material;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.render = this.render.bind(this);
  }

  _setRenderer(element: HTMLElement | null) {
    if (!element) return;
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    element?.appendChild(this.renderer.domElement);
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );
    // const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 180);
    // const dist = PARAMS.WINDOW.H / 2 / Math.tan(fovRad);

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      PARAMS.CAMERA.POSITION.Z,
    );
  }

  _setMesh() {
    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y,
      PARAMS.PLANE_GEOMETRY.X_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
    );

    this.uniforms = {
      uTime: { value: 0 },
      uPlaneAspect: { value: PARAMS.WINDOW.W / PARAMS.WINDOW.H },
      uResolution: { value: { x: window.innerWidth, y: window.innerHeight } },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _setControl() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;

    const axesHelper = new THREE.AxesHelper(300);
    this.scene.add(axesHelper);
  }

  _onResize() {
    setTimeout(() => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.mesh.scale.set(window.innerWidth, window.innerHeight);
      this.material.uniforms.uResolution.value = {
        x: window.innerWidth,
        y: window.innerHeight,
      };
    }, 500);
  }

  init() {
    this._setRenderer(document?.querySelector(".webgl"));
    this._setCamera();
    this._setMesh();
    this._setControl();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
    this.material.uniforms.uTime.value += Math.abs(Math.sin(0.01));
  }
}
