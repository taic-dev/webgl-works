import * as THREE from "three";
import { PARAMS } from "./params";
import displacement1 from "../image/displacement1.png";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import { lerp } from "./utils";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.ambientLight;
    this.directionalLight;
    this.geometry;
    this.material;
    this.uniforms;
    this.refImage;
    this.mesh;

    this.targetScrollY = 0;
    this.currentScrollY = 0;
    this.scrollOffset = 0;

    this.imageArray = [...document.querySelectorAll("img")];
    this.imagePlaneArray = [];

    this.render = this.render.bind(this);
  }

  createMesh(img: HTMLImageElement) {
    this.geometry = new THREE.PlaneGeometry(
      1,
      1,
      PARAMS.PLANE_GEOMETRY.W_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
    );

    const loader = new THREE.TextureLoader();
    const texture = loader.load(img.src);
    const displacement = loader.load(displacement1);

    this.uniforms = {
      uTime: { value: 0 },
      uTexture: { value: texture },
      uDisplacement: { value: displacement },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: img.clientWidth / img.clientHeight },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  setImagePlaneParams(img: HTMLImageElement, mesh: THREE.Mesh) {
    const rect = img.getBoundingClientRect();
    mesh.scale.x = rect.width;
    mesh.scale.y = rect.height;

    const x = rect.left - PARAMS.WINDOW.WIDTH / 2 + rect.width / 2;
    const y = -rect.top + PARAMS.WINDOW.HEIGHT / 2 - rect.height / 2;
    mesh.position.set(x, y, mesh.position.z);
  }

  updateImagePlaneParams(img: HTMLImageElement, mesh: any) {
    this.setImagePlaneParams(img, mesh);
    mesh.material.uniforms.uTime.value = this.scrollOffset;
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(PARAMS.WINDOW.WIDTH, PARAMS.WINDOW.HEIGHT);
    const wrapper = document.querySelector(".webgl");
    wrapper?.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );

    const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 180);
    const dist = PARAMS.WINDOW.HEIGHT / 2 / Math.tan(fovRad);

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      dist
    );

    this.scene = new THREE.Scene();
  }

  render() {
    window.addEventListener("load", () => {
      for (const img of this.imageArray) {
        const mesh = this.createMesh(img);
        this.scene.add(mesh);
        this.setImagePlaneParams(img, mesh);

        this.imagePlaneArray.push({ img, mesh });
      }
    });

    this.targetScrollY = document.getElementById("root")?.scrollTop;
    this.currentScrollY = lerp(this.currentScrollY, this.targetScrollY, 0.1);
    this.scrollOffset = this.targetScrollY - this.currentScrollY;

    for (const plane of this.imagePlaneArray) {
      this.updateImagePlaneParams(plane.img, plane.mesh);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
