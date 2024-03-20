import * as THREE from 'three';
import { PARAMS } from './params';
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

export class Webgl {
  [x: string]: any

  constructor() {
    this.renderer
    this.camera
    this.scene
    this.geometry
    this.material
    this.uniforms
    this.mesh

    this.render = this.render.bind(this);
    this.imgArray = document.querySelectorAll('.image-wrapper img');
  }

  // Renderer
  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true })
    this.renderer.setPixelRatio(PARAMS.WINDOW.DEVICE_PIXEL_RATIO);
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);

    const webgl = document.querySelector('.webgl');
    webgl?.appendChild(this.renderer.domElement);
  }

  // Camera
  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR,
    );
    const fovRad = (PARAMS.CAMERA.FOV / 2) * (Math.PI / 180);
    const dist = PARAMS.WINDOW.H / 2 / Math.tan(fovRad);

    this.camera.position.set(
      PARAMS.CAMERA.POSITION.X,
      PARAMS.CAMERA.POSITION.Y,
      dist
    )
  }

  // Mesh
  createMesh() {
    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y,
      PARAMS.PLANE_GEOMETRY.X_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS,
    )

    this.uniforms = {

    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  render() {
    this.renderer(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}