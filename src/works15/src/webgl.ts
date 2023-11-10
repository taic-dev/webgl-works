import * as THREE from "three";
import vertex from "../src/shader/vertex.glsl";
import fragment from "../src/shader/fragment.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0xffffff,
      width: innerWidth,
      height: innerHeight,
    };
  }

  static get CAMERA_PARAM() {
    return {
      fov: 50,
      aspect: window.innerWidth / window.innerHeight,
      near: 1.0,
      far: 1000.0,
      x: 0.0,
      y: 0.0,
      z: 10.0,
      lookAt: new THREE.Vector3(),
    };
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 0.5,
      x: -5.0,
      y: 1.0,
      z: 5.0,
    };
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 1,
    };
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.plane;
    this.material;
    this.geometry;
    this.mesh
    this.time;
    this.x;
    this.y;
    this.texture;
    this.img;
    this.numPoints = window.innerWidth * window.innerHeight;

    this.controls;
    this.axesHelper;
    this.render = this.render.bind(this);

    window.addEventListener(
      "resize",
      () => {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
      },
      false
    );
  }

  textureLoad(src: any) {
    const loader = new THREE.TextureLoader();

    loader.load(src, (texture) => {
      this.texture = texture;
      this.texture.minFilter = THREE.LinearFilter;
      this.texture.magFilter = THREE.LinearFilter;

      this.width = texture.image.width;
      this.height = texture.image.height;
      this.img = this.texture.image
      this.init()
      this.render();
    });
  }

  init() {
    // レンダラー
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setClearColor(
      new THREE.Color(WebGL.RENDERER_PARAM.clearColor)
    );
    this.renderer.setSize(
      WebGL.RENDERER_PARAM.width,
      WebGL.RENDERER_PARAM.height
    );
    const wrapper = document.querySelector(".webgl");
    wrapper?.appendChild(this.renderer.domElement);

    // シーン
    this.scene = new THREE.Scene();

    // カメラ
    this.camera = new THREE.PerspectiveCamera(
      WebGL.CAMERA_PARAM.fov,
      WebGL.CAMERA_PARAM.aspect,
      WebGL.CAMERA_PARAM.near,
      WebGL.CAMERA_PARAM.far
    );

    this.camera.position.set(
      WebGL.CAMERA_PARAM.x,
      WebGL.CAMERA_PARAM.y,
      WebGL.CAMERA_PARAM.z
    );

    this.camera.lookAt(WebGL.CAMERA_PARAM.lookAt);

    // ライト
    this.directionalLight = new THREE.DirectionalLight(
      WebGL.DIRECTIONAL_LIGHT_PARAM.color,
      WebGL.DIRECTIONAL_LIGHT_PARAM.intensity
    );

    this.directionalLight.position.set(
      WebGL.DIRECTIONAL_LIGHT_PARAM.x,
      WebGL.DIRECTIONAL_LIGHT_PARAM.y,
      WebGL.DIRECTIONAL_LIGHT_PARAM.z
    );
    this.scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(
      WebGL.AMBIENT_LIGHT_PARAM.color,
      WebGL.AMBIENT_LIGHT_PARAM.intensity
    );
    this.scene.add(this.ambientLight);

    // image
    console.log(this.img)
    this.img = this.texture.image;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    let numVisible = this.numPoints;
		let threshold = 0;
    let originalColors
 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx?.scale(1, -1);
    ctx?.drawImage(this.img, 0, 0, window.innerWidth, window.innerHeight * -1);
    const imgData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
    
    if(!imgData) return
    
    originalColors = Float32Array.from(imgData.data);

    for (let i = 0; i < this.numPoints; i++) {
      if (originalColors[i * 4 + 0] > threshold) numVisible++;
    }

    // uniforms
    const uniforms = {
      uTime: { value: 0.0 },
      uRandom: { value: 1.0 },
      uDepth: { value: 0.0 },
      uSize: { value: 0.0 },
      uTextureSize: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uTexture: { value: this.texture },
      uTouch: { value: null },
    };

    this.material = new THREE.RawShaderMaterial({
      uniforms,
      vertexShader: vertex,
      fragmentShader: fragment,
      depthTest: false,
      transparent: true,
    });

    this.geometry = new THREE.InstancedBufferGeometry();

    // positions
    const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
    positions.setXYZ(0, -0.5, 0.5, 0.0);
    positions.setXYZ(1, 0.5, 0.5, 0.0);
    positions.setXYZ(2, -0.5, -0.5, 0.0);
    positions.setXYZ(3, 0.5, -0.5, 0.0);
    this.geometry.setAttribute('position', positions);

    // uvs
    const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
    uvs.setXYZ(0.0, 0.0, 0.0, 0.0);
    uvs.setXYZ(1, 1.0, 0.0, 0.0);
    uvs.setXYZ(2, 0.0, 1.0, 0.0);
    uvs.setXYZ(3, 1.0, 1.0, 0.0);
    this.geometry.setAttribute("uv", uvs);

    // index
    this.geometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1)
    );

    const indices = new Uint16Array(numVisible);
    const offsets = new Float32Array(numVisible * 3);
    const angles = new Float32Array(numVisible);

    for (let i = 0, j = 0; i < this.numPoints; i++) {
      if (originalColors[i * 4 + 0] <= threshold) continue;

      offsets[j * 3 + 0] = i % this.width;
      offsets[j * 3 + 1] = Math.floor(i / this.width);

      indices[j] = i;

      angles[j] = Math.random() * Math.PI;

      j++;
    }

    this.geometry.setAttribute(
      "pindex",
      new THREE.InstancedBufferAttribute(indices, 1, false)
    );
    this.geometry.setAttribute(
      "offset",
      new THREE.InstancedBufferAttribute(offsets, 3, false)
    );
    this.geometry.setAttribute(
      "angle",
      new THREE.InstancedBufferAttribute(angles, 1, false)
    );

    // plane
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane)

    // コントロール
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // ヘルパー
    this.axesHelper = new THREE.AxesHelper(5.0);
    this.scene.add(this.axesHelper);
  }

  render() {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  }
}
