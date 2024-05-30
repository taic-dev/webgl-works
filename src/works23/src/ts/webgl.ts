import * as THREE from "three";
import displacement from "../img/displacement.jpg";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import gsap from "gsap";
import { clientRectCoordinate, lerp } from "./utils";
import { lenisLib } from "./lenis";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.ShaderMaterial | undefined;
  mesh: THREE.Mesh | undefined;
  uniforms: any;
  targetScrollY: number;
  currentScrollY: number;
  scrollOffset: number;
  offset: number;
  time: number;
  isOpen: boolean;
  images: HTMLImageElement[];
  modal: HTMLElement | null;
  modalImage: HTMLElement | null;
  close: HTMLElement | null;
  planeArray: { image: HTMLImageElement; mesh: THREE.Mesh }[];

  constructor() {
    this.renderer;
    this.camera;
    this.scene = new THREE.Scene();
    this.geometry;
    this.material;
    this.mesh;
    this.uniforms;
    this.targetScrollY = 0;
    this.currentScrollY = 0;
    this.scrollOffset = 0;
    this.offset = -2500;
    this.time = 0;
    this.isOpen = false;

    this.render = this.render.bind(this);

    this.modal = document.querySelector(".modal");
    this.modalImage = document.querySelector(".modal-image");
    this.images = [
      ...document.querySelectorAll(".item-image img"),
    ] as HTMLImageElement[];
    this.close = document.querySelector(".close");
    this.planeArray = [];
  }

  setCanvas() {
    const webgl = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    webgl?.appendChild(this.renderer.domElement);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const fovRad = (60 / 2) * (Math.PI / 180);
    const dist = window.innerHeight / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, dist);
  }

  setMesh(image: HTMLImageElement) {
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

    const loader = new THREE.TextureLoader();

    this.uniforms = {
      uTexture: { value: loader.load(image.src) },
      uDisplacement: { value: loader.load(displacement) },
      uImageAspect: { value: image.naturalWidth / image.naturalHeight },
      uPlaneAspect: { value: image.clientWidth / image.clientHeight },
      uOffset: { value: this.offset },
      uTime: { value: this.time },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  initMesh() {
    this.images.forEach((image) => {
      const mesh = this.setMesh(image);
      this.scene.add(mesh);
      this.setMeshPosition(image, mesh);
      this.planeArray.push({ image, mesh });
    });
  }

  setMeshPosition(img: HTMLImageElement, mesh: THREE.Mesh) {
    const rect = img.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect)

    mesh.position.set(x, y, 1);

    mesh.scale.x = rect.width;
    mesh.scale.y = rect.height;
    (mesh.material as any).uniforms.uOffset.value = this.offset
  }

  setModalPosition(mesh: THREE.Mesh) {
    const rect = this.modalImage?.getBoundingClientRect();
    if (!rect) return;

    const { x, y } = clientRectCoordinate(rect);

    gsap.to(mesh.position, {
      x,
      y,
      z: 2,
      duration: 1.5,
      delay: 1,
      ease: "power2.easeOut",
    });

    gsap.to(mesh.scale, {
      x: rect.width,
      y: rect.height,
      duration: 1.5,
      delay: 1,
      ease: "power2.easeOut",
    });
  }

  openModalEvent() {
    this.planeArray.forEach((plane) => {
      plane.image.addEventListener("click", () => {
        plane.image.classList.add("is-show");
        this.modal?.classList.add("is-show");
        this.isOpen = true;
        lenisLib.lenis.stop();

        this.hideImageAnimation(true);
        this.setModalPosition(plane.mesh);
      });
    });
  }

  closeModalEvent() {
    this.close?.addEventListener("click", () => {
      this.hideImageAnimation(false);
      this.modal?.classList.remove("is-show");
      lenisLib.lenis.start();

      setTimeout(() => {
        this.isOpen = false;
        this.offset = -2500;
        this.showImageAnimation();
      }, 1000);

      this.planeArray.forEach((plane) => {
        plane.image.classList.remove("is-show");
      });
    });
  }

  hideImageAnimation(isMultiple: boolean) {
    this.planeArray.forEach((plane) => {
      const target = (plane.mesh.material as any).uniforms.uOffset;
      if (isMultiple) {
        if (!plane.image.classList.contains("is-show")) {
          gsap.to(target, {
            value: -2500,
            duration: 1.5,
            ease: "power1.inOut",
          });
        }
      } else {
        if (plane.image.classList.contains("is-show")) {
          gsap.to(target, {
            value: -2500,
            duration: 1.5,
            ease: "power1.inOut",
          });
        }
      }
    });
  }

  showImageAnimation() {
    this.planeArray.forEach((plane) => {
      const target = (plane.mesh.material as any).uniforms.uOffset;

      gsap.to(target, {
        value: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    });
  }

  scrollAnimation() {
    this.targetScrollY = document.documentElement.scrollTop;
    this.currentScrollY = lerp(this.currentScrollY, this.targetScrollY, 0.1);
    this.scrollOffset = this.targetScrollY - this.currentScrollY;
    this.offset = this.scrollOffset;
  }

  onResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.initMesh();
    this.render();

    this.openModalEvent();
    this.closeModalEvent();
    this.showImageAnimation();
  }

  render() {
    if (!this.camera) return;
    this.renderer?.render(this.scene, this.camera);

    if (!this.isOpen) {
      this.planeArray.forEach((plane) => {
        this.setMeshPosition(plane.image, plane.mesh);
      });
    }

    this.scrollAnimation();

    requestAnimationFrame(this.render);
  }
}
