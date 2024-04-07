import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PARAMS } from "./params";
import vertexShader from "../shader/vertexShader.glsl";
import fragmentShader from "../shader/fragmentShader.glsl";

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer;
    this.camera;
    this.geometry;
    this.material;
    this.mesh;
    this.uniforms;
    this.scene = new THREE.Scene();

    this.render = this.render.bind(this);
  }

  _setRenderer(element: Element | null) {
    if (!element) return;
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.W, PARAMS.WINDOW.H);
    this.renderer.setPixelRatio(PARAMS.WINDOW.PIXEL_RATIO);
    element.appendChild(this.renderer.domElement);
  }

  _setCamera() {
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
      // dist
      200
    );

    this.camera.lookAt(0, 0, 0);
  }

  _setMesh() {
    this.geometry = new THREE.PlaneGeometry(
      PARAMS.PLANE_GEOMETRY.X,
      PARAMS.PLANE_GEOMETRY.Y,
      PARAMS.PLANE_GEOMETRY.X_SEGMENTS,
      PARAMS.PLANE_GEOMETRY.Y_SEGMENTS
    );

    // this.uniforms = {
    //   uPlaneAspect: { value: PARAMS.WINDOW.W / PARAMS.WINDOW.H },
    //   uTexture: { value: new THREE.TextureLoader().load(PARAMS.TEXTURE) },
    // };

    this.material = new THREE.ShaderMaterial({
      // uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  _setParticle() {
    const geometry = new THREE.BufferGeometry();

    const multiplier = 18;
    const nbColumns = 16 * multiplier;
    const nbLines = 9 * multiplier;

    const vertices: number[] = [];

    for(let i = 0; i < nbColumns; i++) {
      for (let j = 0; j < nbLines; j++) {
        const points = [i, j, 0];
        vertices.push(...points);
      }
    }

    const vertices32 = new Float32Array(vertices);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices32, 3));
    geometry.center()

    const loader = new THREE.TextureLoader();
    const texture = loader.load(PARAMS.TEXTURE);

    this.uniforms = {
      uPointSize: { value: 8. },
      uTexture: { value: texture },
      uNbColumns: { value: nbColumns },
      uNbLines: { value: nbLines },
    }

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
    });
    const mesh = new THREE.Points(geometry, material);
    this.scene.add(mesh);
  }

  _setControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
  }

  _setAxesHelper() {
    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  init() {
    const element = document?.querySelector(".webgl")
    this._setRenderer(element);
    this._setCamera();
    // this._setMesh();

    this._setControls();
    this._setAxesHelper();

    this._setParticle();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.render);
  }

  onResize() {
    setTimeout(() => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.mesh.scale.set(window.innerWidth, window.innerHeight);
    }, 500);
  }
}
