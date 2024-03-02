import * as THREE from "three";
import { Webgl } from "./webgl";
import { PARAMS } from "./params";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import fragmentShader from "./shader/fragment.glsl";
import vertexShader from "./shader/vertex.glsl";

export class Slider {
  [x: string]: any;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.scene;
    this.camera;
    this.ambientLight;
    this.directionalLight;
    this.geometry;
    this.material;
    this.mesh;
    this.textureWidth;
    this.textureHeight;

    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);
  }

  init() {
    const webgl = new Webgl();

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

    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);

    this.geometry = webgl.createPlaneGeometry(
      PARAMS.PLANE_GEOMETRY.W,
      PARAMS.PLANE_GEOMETRY.Y
    );

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      PARAMS.MATERIAL.TEXTURE,

      () => {
        this.textureWidth = texture.image.width;
        this.textureHeight = texture.image.height;

        const uniforms = {
          uTexture: {
            value: texture,
          },
          uTextureAspect: {
            value: this.textureWidth / this.textureHeight,
          },
          uScreenAspect: {
            value: window.innerWidth / window.innerHeight,
          },
        };

        this.material = webgl.createShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
        });
        this.mesh = webgl.createMesh(this.geometry, this.material);
        this.scene.add(this.mesh);
      }
    );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // resize 処理
    window.addEventListener("resize", () => {
      this.material.uniforms.uScreenAspect.value =
        window.innerWidth / window.innerHeight;

      // rendererを更新
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}
