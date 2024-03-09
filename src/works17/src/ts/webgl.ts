import * as THREE from "three";
import { PARAMS } from "./params";
import { ImagePlane } from "./imagePlane";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

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

    this.createMesh;
    this.imageArray;
    this.imagePlaneArray = []

    this.render = this.render.bind(this);
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

    this.createMesh = (img: HTMLImageElement) => {
      this.geometry = new THREE.PlaneGeometry(
        1,
        1,
        PARAMS.PLANE_GEOMETRY.W_SEGMENTS,
        PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
      );

      const loader = new THREE.TextureLoader();
      const texture = loader.load(img.src);

      this.uniforms = {
        uTime: { value: 0 },
        uTexture: { value: texture },
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
    };

    window.addEventListener("resize", () => {
      // rendererを更新
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  render() {
    window.addEventListener('load', () => {
      this.imageArray = [...document.querySelectorAll('img')];
      for(const img of this.imageArray) {
        const mesh = this.createMesh(img)
        this.scene.add(mesh);
  
        const imagePlane = new ImagePlane(mesh, img);
        imagePlane.setParams();
  
        this.imagePlaneArray.push(imagePlane);
      }
    })

    for (const plane of this.imagePlaneArray) {
      plane.update();
    } 
    
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }
}
