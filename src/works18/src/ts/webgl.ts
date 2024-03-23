import * as THREE from "three";
import { gsap } from "gsap";
import { PARAMS } from "./params";
import displacement from "../image/displacement.png";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer = null;
    this.camera;
    this.scene;
    this.geometry;
    this.material;

    this.isAnimation = true;
    this.imgArray = document.querySelectorAll(".gallery-item img");
    this.textureArray = [];
    this.planeArray = [];
    this.workButtonArray = document.querySelectorAll(".work-item");
    this.current = 0;
    this.positionZ = 50

    this.render = this.render.bind(this);
  }

  createMesh(img: HTMLImageElement) {
    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y,
      PARAMS.PLANE_GEOMETRY.X_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
    );

    const loader = new THREE.TextureLoader();

    this.uniforms = {
      uTexture1: { value: this.textureArray[0] },
      uTexture2: { value:this.textureArray[1] },
      uDisplacementTexture: { value: loader.load(displacement) },
      uImageAspect: { value: img.naturalWidth / img.naturalHeight },
      uPlaneAspect: { value: img.clientWidth / img.clientHeight },
      uOffset: { value: 0.0 },
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

  updateImagePlane(img: HTMLImageElement, mesh: THREE.Mesh) {
    this.setImagePlane(img, mesh);

    // ジオメトリの頂点座標情報
    const position = mesh.geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      // 各頂点のXYZ座標
      const x = position.getX(i);
      const y = position.getY(i);

      // 高さを計算（PlaneGeometryの場合はZ座標）
      const nextZ = Math.sin(x * 5. + y * 5. + Date.now() * 0.002) * this.positionZ;

      position.setX(i, x);
      position.setY(i, y);
      position.setZ(i, !this.isAnimation ? nextZ : 0);
      // position.setZ(i, nextZ);
    }

    // 頂点の更新が必要なことを伝える
    position.needsUpdate = true;
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);

    const webglDom = document.querySelector(".webgl");
    webglDom?.appendChild(this.renderer.domElement);

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

    this.scene = new THREE.Scene();
    const loader = new THREE.TextureLoader();

    for (const img of PARAMS.IMAGE.VALUE) {
      this.textureArray.push(loader.load(img));
    }

    this.workButtonArray.forEach((workButton: HTMLElement) => {
      workButton.addEventListener("click", () => {
        if (!this.isAnimation) return;
        this.isAnimation = false;
        const index = (workButton.id as unknown as number) - 1;
        this.uniforms.uTexture2.value = this.textureArray[this.current];
        this.uniforms.uOffset.value = 1.0;

        gsap.to(this.uniforms.uOffset, {
          duration: 1.5,
          value: 0.0,
          ease: "power2.inOut",
          onStart: () => {
            this.uniforms.uTexture1.value = this.textureArray[index];
            this.positionZ = 50.
          },
          onComplete: () => {
            this.current = index;
            this.uniforms.uOffset.value = 0.0;
            this.positionZ = 0.0
          },
        });

        setTimeout(() => {
          this.isAnimation = true;
        }, 1800);
      });
    });
  }

  render() {
    window.addEventListener("load", () => {
      for (const img of this.imgArray) {
        const mesh = this.createMesh(img);
        this.scene.add(mesh);
        this.setImagePlane(img, mesh);
        this.planeArray.push({ img, mesh });
      }
    });

    for (const plane of this.planeArray) {
      this.updateImagePlane(plane.img, plane.mesh);
    }

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
