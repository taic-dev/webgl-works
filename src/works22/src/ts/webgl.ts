import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { PARAMS, POSITION_NAME, PERCENTS } from "./constants";
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

  _getGeometryPosition(index: number) {
    const mesh = new THREE.Mesh(PARAMS.GEOMETRY[index]);
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

    return vertices;
  }

  _setGeometryPosition(
    pointGeometry: THREE.BufferGeometry,
    name: string,
    position: number[]
  ) {
    pointGeometry.setAttribute(
      name,
      new THREE.Float32BufferAttribute(position, 3)
    );
  }

  _setMesh() {
    this.pointGeometry = new THREE.BufferGeometry();

    POSITION_NAME.forEach((name, index) => {
      const positionNumber = this._getGeometryPosition(index);
      this._setGeometryPosition(this.pointGeometry, name, positionNumber);
    });

    this.uniforms = {
      uTime: { value: 0 },
      uAnimation: { value: 0 },
      uPercents: { value: PERCENTS },
    };

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
        (this.current.value - 1 + PARAMS.GEOMETRY.length) %
        PARAMS.GEOMETRY.length;

      sliderAnimation({
        turn: this.turn,
        uAnimation: this.uniforms.uAnimation,
        uPercents: this.uniforms.uPercents,
        index,
      });

      this.current.value = index;
    });

    this.next.addEventListener("click", () => {
      const index =
        (this.current.value + 1 + PARAMS.GEOMETRY.length) %
        PARAMS.GEOMETRY.length;

      sliderAnimation({
        turn: this.turn,
        uAnimation: this.uniforms.uAnimation,
        uPercents: this.uniforms.uPercents,
        index,
      });

      this.current.value = index;
    });
  }

  _setControl() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
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
