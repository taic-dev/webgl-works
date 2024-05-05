import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { PARAMS } from "./constants";
import { scaleAnimation, sliderAnimation } from "./animation";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.render = this.render.bind(this);
    this.camera;
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);
    this.mesh;

    this.turn = {
      x: 0.005,
      y: 0.005,
    };

    this.prev = document.querySelector(".prev");
    this.next = document.querySelector(".next");
    this.current = { value: 0 };
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setClearColor({ color: 0x333333 });
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
    this.geometryArray = [
      new THREE.PlaneGeometry(10, 10),
      new THREE.TorusKnotGeometry(4, 1.3, 100, 16),
      new THREE.SphereGeometry(5, 32, 32),
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.ConeGeometry(5, 10, 32),
      new THREE.CylinderGeometry(3, 3, 10, 32),
      new THREE.TorusGeometry(5, 2, 16, 100),
    ];
    const mesh = new THREE.Mesh(this.geometryArray[this.current.value]);
    this.sampler = new MeshSurfaceSampler(mesh).build();

    const vertices = [];
    const randVertices = [];
    const tempPosition = new THREE.Vector3();

    for (let i = 0; i < 15000; i++) {
      this.sampler.sample(tempPosition);
      vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
      randVertices.push(
        (Math.random() - 1.0) * 2.0,
        (Math.random() - 1.0) * 2.0,
        (Math.random() - 1.0) * 2.0
      );
    }

    this.uniforms = {
      uTime: { value: 0 },
      uAnimation: { value: 0 },
    };

    this.pointGeometry = new THREE.BufferGeometry();
    this.pointGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.pointGeometry.setAttribute(
      "rands",
      new THREE.Float32BufferAttribute(randVertices, 3)
    );
    this.pointMaterial = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    this.points = new THREE.Points(this.pointGeometry, this.pointMaterial);
    this.group.add(this.points);
  }

  _setAnimation() {
    scaleAnimation({
      turn: this.turn,
      uAnimation: this.uniforms.uAnimation,
    });
  }

  _sliderAnimation() {
    this.prev.addEventListener("click", () => {
      const index =
        (this.current.value - 1 + this.geometryArray.length) %
        this.geometryArray.length;

      sliderAnimation({
        turn: this.turn,
        uAnimation: this.uniforms.uAnimation,
        sliderIndex: { index, current: this.current },
      });

      this.current.value = index
    });

    this.next.addEventListener("click", () => {
      const index =
        (this.current.value + 1 + this.geometryArray.length) %
        this.geometryArray.length;

      sliderAnimation({
        turn: this.turn,
        uAnimation: this.uniforms.uAnimation,
        sliderIndex: { index, current: this.current },
      });

      this.current.value = index
    });
  }

  _setControl() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  _setAxesHelper() {
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  _onResize() {
    setTimeout(() => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, 500);
  }

  init() {
    this._setRenderer();
    this._setCamera();
    this._setMesh();
    this._setAnimation();
    this._sliderAnimation();
    this._setControl();
    this._setAxesHelper();
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
    this.group.rotation.x += this.turn.x;
    this.group.rotation.y += this.turn.y;
    this.group.rotation.z += 0.001;

    this.uniforms.uTime.value++;
  }
}
