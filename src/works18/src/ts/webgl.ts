import * as THREE from "three";
import { gsap, ScrollTrigger } from "gsap/all";
import { PARAMS } from "./params";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer;
    this.camera;
    this.scene = new THREE.Scene();
    this.geometry;
    this.material;
    this.uniforms;
    this.mesh;
    this.clock = new THREE.Clock();

    this.render = this.render.bind(this);
    this.imgArray = document.querySelectorAll(".image-wrapper img");
    this.planeArray = [];
  }

  // Renderer
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(PARAMS.WINDOW.DEVICE_PIXEL_RATIO);
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);

    const webgl = document.querySelector(".webgl");
    webgl?.appendChild(this.renderer.domElement);
  }

  // Camera
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );
    const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 180);
    const dist = PARAMS.WINDOW.H / 2 / Math.tan(fovRad);

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      dist
    );
  }

  // Mesh
  createMesh(img: HTMLImageElement) {
    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y,
      PARAMS.PLANE_GEOMETRY.X_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
    );

    const loader = new THREE.TextureLoader();
    const texture = loader.load(img.src);

    this.uniforms = {
      uTexture: { value: texture },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: img.clientWidth / img.clientHeight },
      uProgress: { value: 0 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  setImagePlane(img: HTMLImageElement, mesh: THREE.Mesh) {
    const rect = img.getBoundingClientRect();
    mesh.scale.x = rect.width;
    mesh.scale.y = rect.height;

    const x = rect.left - PARAMS.WINDOW.W / 2 + rect.width / 2;
    const y = -rect.top + PARAMS.WINDOW.H / 2 - rect.height / 2;

    mesh.position.set(x, y, mesh.position.z);
  }

  _noiseAnimation(img:HTMLImageElement, mesh: any) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(mesh.material.uniforms.uProgress, {
      value: 1.0,
      duration: 1.5,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: img,
        start: "bottom bottom",
      }
    });
    
    mesh.material.uniforms.uProgress.value = Math.abs(
      Math.sin(this.clock.getElapsedTime())
    );
  }

  _waveAnimation(mesh: any) {
    const position = mesh.geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {

      const x = position.getX(i);
      const y = position.getY(i);
      const nextZ = Math.sin(x * 1 + y * 5 + Date.now() * 0.003) * 50;

      position.setZ(i, nextZ);
    }

    position.needsUpdate = true;
  }

  updateImagePlane(img: HTMLImageElement, mesh: any) {
    this.setImagePlane(img, mesh);
  }

  onResize() {
    this.camera.aspect = PARAMS.WINDOW.W / PARAMS.WINDOW.H;
    this.camera.updateProjectMatrix();
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(Math.min(PARAMS.WINDOW.DEVICE_PIXEL_RATIO, 2));
  }

  render() {
    window.addEventListener("load", () => {
      for (const img of this.imgArray) {
        const mesh = this.createMesh(img);
        this.scene.add(mesh);
        this.setImagePlane(img, mesh);
        this.planeArray.push({ img, mesh });
        this._noiseAnimation(img, mesh);
      }
    });

    for (const plane of this.planeArray) {
      this.updateImagePlane(plane.img, plane.mesh);
      this._waveAnimation(plane.mesh);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
