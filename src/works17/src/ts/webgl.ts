import * as THREE from "three";
import { PARAMS } from "./params";
import vertexShader from "../shader/vertexShader.glsl"
import fragmentShader from "../shader/fragmentShader.glsl"

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

    this.render = this.render.bind(this);
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.WIDTH, PARAMS.WINDOW.HEIGHT);
    const wrapper = document.querySelector(".webgl");
    wrapper?.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

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
    )

    this.ambientLight = new THREE.AmbientLight(
      PARAMS.AMBIENT_LIGHT.COLOR,
      PARAMS.AMBIENT_LIGHT.INTENSITY
    );

    this.directionalLight = new THREE.DirectionalLight(
      PARAMS.DIRECTIONAL_LIGHT.COLOR,
      PARAMS.DIRECTIONAL_LIGHT.INTENSITY,
    )

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y
    )

    const loader = new THREE.TextureLoader();
    const texture = loader.load(PARAMS.IMAGE.VALUE[0]);

    const uniforms = {
      uTexture: {value: texture},
      uImageAspect: { value: 1920 / 1280 },
      uPlaneAspect: { value: PARAMS.PLANE_GEOMETRY.ASPECT }
    }

    this.material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera)
  }
}
