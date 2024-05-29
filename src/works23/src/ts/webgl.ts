import * as THREE from "three";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

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
  images: HTMLImageElement[];
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

    this.render = this.render.bind(this);
    this.images = [
      ...document.querySelectorAll(".item-image img"),
    ] as HTMLImageElement[];
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
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(image.src);

    this.uniforms = {
      uTexture: { value: texture },
      uImageAspect: { value: image.naturalWidth / image.naturalHeight },
      uPlaneAspect: { value: image.clientWidth / image.clientHeight },
      uOffset: { value: this.scrollOffset },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    return this.mesh;
  }

  setMeshPosition(image: HTMLImageElement, mesh: THREE.Mesh, offset: number) {
    const rect = image.getBoundingClientRect();
    mesh.scale.x = rect.width;
    mesh.scale.y = rect.height;

    const x = rect.left - window.innerWidth / 2 + rect.width / 2;
    const y = -rect.top + window.innerHeight / 2 - rect.height / 2;

    mesh.position.set(x, y, mesh.position.z);
    (mesh.material as any).uniforms.uOffset.value = offset;
  }

  updateMesh(img: HTMLImageElement, mesh: any, offset: number) {
    this.setMeshPosition(img, mesh, offset);
  }

  onScroll() {
    const lerp = (start: number, end: number, multiplier: number) => {
      return (1 - multiplier) * start + multiplier * end;
    };

    this.targetScrollY = document.documentElement.scrollTop;
    this.currentScrollY = lerp(this.currentScrollY, this.targetScrollY, 0.1);
    this.scrollOffset = this.targetScrollY - this.currentScrollY;
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
    this.render();
  }

  render() {
    if (!this.camera) return;

    window.addEventListener("load", () => {
      this.images.forEach((image) => {
        const mesh = this.setMesh(image);
        this.scene.add(mesh);
        this.setMeshPosition(image, mesh, 0);
        this.planeArray.push({ image, mesh });
      });
    });

    this.onScroll();

    for (const plane of this.planeArray) {
      this.updateMesh(plane.image, plane.mesh, this.scrollOffset);
    }

    this.renderer?.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
