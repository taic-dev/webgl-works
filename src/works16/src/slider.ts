import * as THREE from "three";
import { gsap } from "gsap";
import { Webgl } from "./webgl";
import { PARAMS } from "./params";
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
    this.uniforms;

    this.currentTexture;
    this.prevTexture;
    this.nextTexture;

    this.textureWidth;
    this.textureHeight;

    this.textureAspect;
    this.current = 0;
    this.paused = 0;

    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");

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

    this.uniforms = {
      uTexture1: {
        value: loader.load(PARAMS.MATERIAL.TEXTURE[0]),
      },
      uTexture2: {
        value: loader.load(PARAMS.MATERIAL.TEXTURE[1]),
      },
      uTextureAspect: {
        value: PARAMS.MATERIAL.TEXTURE_ASPECT,
      },
      uDisplacementTexture: {
        value: loader.load(PARAMS.MATERIAL.DISPLACEMENT_TEXTURE),
      },
      uScreenAspect: {
        value: window.innerWidth / window.innerHeight,
      },
      uOffset: {
        value: 0.0,
      },
    };

    this.material = webgl.createShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    this.mesh = webgl.createMesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    // Prevをクリック時
    this.prevButton.addEventListener("click", () => {
      const index =
        (this.current - 1 + PARAMS.MATERIAL.TEXTURE.length) %
        PARAMS.MATERIAL.TEXTURE.length;
      this.uniforms.uTexture2.value = loader.load(
        PARAMS.MATERIAL.TEXTURE[this.current]
      );

      this.uniforms.uOffset.value = 1.0;

      gsap.to(this.uniforms.uOffset, {
        duration: 1.5,
        value: 0.0,
        ease: "power2.inOut",
        onStart: () => {
          this.uniforms.uTexture1.value = loader.load(
            PARAMS.MATERIAL.TEXTURE[index]
          );
        },
        onComplete: () => {
          this.current = index;
          this.uniforms.uOffset.value = 0.0;
        },
      });

      this.prevButton.disabled= false;
    });

    // Nextをクリック時
    this.nextButton.addEventListener("click", () => {

      const index =
        (this.current + 1 + PARAMS.MATERIAL.TEXTURE.length) %
        PARAMS.MATERIAL.TEXTURE.length;

      this.uniforms.uTexture2.value = loader.load(
        PARAMS.MATERIAL.TEXTURE[this.current]
      );

      this.uniforms.uOffset.value = 1.0;

      gsap.to(this.uniforms.uOffset, {
        duration: 1.5,
        value: 0.0,
        ease: "power2.inOut",
        onStart: () => {
          this.uniforms.uTexture1.value = loader.load(
            PARAMS.MATERIAL.TEXTURE[index]
          );
        },
        onComplete: () => {
          this.current = index;
          this.uniforms.uTexture1.value = loader.load(
            PARAMS.MATERIAL.TEXTURE[index]
          );
          this.uniforms.uOffset.value = 0.0;
        },
      });
    });

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
