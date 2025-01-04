import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";
import cardBack from "../img/card-bg.png";
import effectColor1 from "../img/effect1.jpg";
import effectColor2 from "../img/effect2.jpg";
import { PARAMS, textureArray } from "./constants";
import { clientRectCoordinate } from "./utils";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  onMeshScaleUp,
  onMeshScaleDown,
  loadingAnimation,
  onMouseMove,
  onMouseLeave,
  backCardAnimation,
  frontCardAnimation,
} from "./animation";

export class Webgl {
  renderer: THREE.WebGLRenderer | undefined;
  camera: THREE.PerspectiveCamera | undefined;
  scene: THREE.Scene;
  geometry: THREE.PlaneGeometry | undefined;
  material: THREE.ShaderMaterial | undefined;
  uniforms: any;
  mesh: THREE.Mesh | undefined;
  clock: THREE.Clock | undefined;
  raycaster: THREE.Raycaster;
  cards: HTMLImageElement[] | null;
  modal: HTMLImageElement | null;
  close: HTMLElement | null;
  imageElement: HTMLImageElement | null;
  planeArray: {
    mesh: THREE.Mesh;
    image: HTMLElement;
    frame: { x: number; y: number; z: number; w: number; h: number };
    isShow: boolean;
  }[];
  controls: OrbitControls | undefined;
  mouse: THREE.Vector2;
  modalInfo: {
    x: number;
    y: number;
    width: number;
    height: number;
    isShow: boolean;
  };

  constructor() {
    this.camera;
    this.geometry;
    this.uniforms;
    this.material;
    this.mesh;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.cards = [...document.querySelectorAll<HTMLImageElement>(".card img")];
    this.modal = document.querySelector<HTMLImageElement>(".modal");
    this.close = document.querySelector<HTMLElement>(".close");
    this.imageElement = document.querySelector<HTMLImageElement>(
      ".image__wrapper div"
    );
    this.planeArray = [];
    this.controls;
    this.mouse = new THREE.Vector2();
    this.modalInfo = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      isShow: false,
    };

    this.render = this.render.bind(this);
  }

  setCanvas() {
    const element = document.querySelector(".webgl");
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    element?.appendChild(this.renderer.domElement);
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      PARAMS.CAMERA.FOV,
      PARAMS.CAMERA.ASPECT,
      PARAMS.CAMERA.NEAR,
      PARAMS.CAMERA.FAR
    );

    const fovRad = (60 / 2) * (Math.PI / 180);
    const dist = window.innerHeight / 2 / Math.tan(fovRad);

    this.camera.position.set(0, 0, dist);
  }

  initMesh() {
    this.cards?.forEach((image, index) => {
      if (!this.imageElement) return;

      const mesh = this.setMesh(image, index);
      this.scene.add(mesh);
      mesh.rotation.y = (Math.PI / 180) * -180;

      const { x, y, width, height } = this.setMeshPosition(mesh, image);
      this.planeArray.push({
        mesh,
        image,
        frame: { x, y, z: 0, w: width, h: height },
        isShow: false,
      });

      const rect = this.imageElement.getBoundingClientRect();
      const { x: modalX, y: modalY } = clientRectCoordinate(rect);
      this.modalInfo.x = modalX;
      this.modalInfo.y = modalY;
      this.modalInfo.width = rect.width;
      this.modalInfo.height = rect.height;
    });
  }

  setMesh(image: HTMLImageElement, index: number) {
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

    const loader = new THREE.TextureLoader();
    const frontTexture = loader.load(textureArray[index]);
    const textureBack = loader.load(cardBack);

    const effectTexture1 = loader.load(effectColor1);
    effectTexture1.wrapS = THREE.RepeatWrapping;
    effectTexture1.wrapT = THREE.RepeatWrapping;
    const effectTexture2 = loader.load(effectColor2);

    const number = index + 1;

    this.uniforms = {
      uResolution: {
        value: {
          x: image.clientWidth,
          y: image.clientHeight,
        },
      },
      uMouse: { value: { x: 0, y: 0 } },
      uIndex: { value: number },
      uFrontTexture: { value: frontTexture },
      uTextureBack: { value: textureBack },
      uImageAspect: { value: image.naturalWidth / image.naturalHeight },
      uPlaneAspect: { value: image.clientWidth / image.clientHeight },
      uLoading: { value: 0 },
      uEffectTexture1: { value: effectTexture1 },
      uEffectTexture2: { value: effectTexture2 },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  setMeshPosition(mesh: THREE.Mesh, image: HTMLElement) {
    setTimeout(() => {
      loadingAnimation(mesh, image)
    }, 500)

    const rect = image.getBoundingClientRect();
    const { x, y } = clientRectCoordinate(rect);
    
    return { x, y, width: rect.width, height: rect.height };
  }

  setModal() {
    this.planeArray.forEach((plane) => {
      // Modal open
      const handleClick = () => {
        plane.isShow = true;
        this.modal && (this.modal.style.zIndex = "1");
        onMeshScaleUp(plane.mesh, this.modalInfo);

        // back card
        this.planeArray.forEach((plane) => {
          if (!plane.isShow) {
            backCardAnimation(plane.mesh);
          }
        });

        // add mouse event
        this.imageElement?.addEventListener("mousemove", handleMouseMove);
        this.imageElement?.addEventListener("mouseleave", handleMouseLeave);
      };

      // Modal Close
      const handleClose = () => {
        this.planeArray.forEach((plane) => {
          if(plane.isShow) {
            plane.isShow = false;
            this.modal && (this.modal.style.zIndex = "-1");
            onMeshScaleDown(plane.mesh, plane.frame);
          }

          // front card
          this.planeArray.forEach((plane) => {
            if (!plane.isShow) {
              frontCardAnimation(plane.mesh);
            }
          });

          // remove mouse event
          this.imageElement?.removeEventListener("mousemove", handleMouseMove);
          this.imageElement?.removeEventListener(
            "mouseleave",
            handleMouseLeave
          );
        });
      };

      const handleMouseMove = (e: MouseEvent) =>
        onMouseMove(e, plane.mesh, this.imageElement);
      const handleMouseLeave = () => onMouseLeave(plane.mesh);

      plane.image.addEventListener("click", handleClick);
      this.close?.addEventListener("click", handleClose);
    });
  }

  setHelper() {
    if (!this.camera) return;
    // OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer?.domElement);

    // AxesHelper
    const axesHelper = new THREE.AxesHelper(2000);
    this.scene.add(axesHelper);
  }

  onResize() {
    setTimeout(() => {
      if (!this.camera) return;
      this.renderer?.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }, 500);
  }

  init() {
    this.setCanvas();
    this.setCamera();
    this.initMesh();
    this.setModal();
  }

  render() {
    if (!this.camera || !this.mesh) return;
    this.renderer?.render(this.scene, this.camera);

    requestAnimationFrame(this.render);
  }
}
