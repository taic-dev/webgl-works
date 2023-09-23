import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Texture from "./images/texture.jpg";
import Vertex from "./shader/vertex.glsl";
import Fragment from "./shader/fragment.glsl";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0x000000,
      width: window.innerWidth,
      height: window.innerHeight,
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
      z: 30.0,
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
    this.flag = false

    this.controls;
    this.axesHelper;
    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();

    window.addEventListener("click", (event) => {
      const x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      const y = (event.clientY / window.innerHeight) * 2.0 - 1.0;
      const v = new THREE.Vector2(x, -y);
      const intersects = this.raycaster.intersectObject(this.plane);

      console.log(intersects)
      if (intersects.length > 0) {
        const object = intersects[0].object;
        let Hold = 0
        if(!this.flag) {
          this.flag = true;
          gsap.to((object.material),{
            onStart: function() {},
            onUpdate: function() {
              const  add = (1.0 * this.progress() - Hold) * (-1) ;
              Hold = 1.0 * this.progress();
              object.material.uniforms.uInfluence.value += add * 100;
              object.material.uniforms.uStep.value += add;
            },
            onRepeat: function() {},
            onComplete:function(){},
          });
        } else {
          this.flag = false;
          gsap.to((object.material),{ 
            onStart: function() {},
            onUpdate: function() {
              const  add = (1.0 * this.progress() - Hold)  ;
              Hold = 1.0 * this.progress();
              object.material.uniforms.uInfluence.value += add * 10;
              object.material.uniforms.uStep.value += add;
            },
            onRepeat: function() {},
            onComplete:function(){},
          });
        }
      } 
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

    // plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10, 500, 500);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms : { 
        uPixelRation : {value:Math.min(window.devicePixelRatio, 2.0)},
        uResolution: {value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
        uTime: { value: 0.0 },//animationに使用
        uSize: { value: 0.01 },//Partcleサイズ
        uStep: { value: 1.00 },//影響度
        uInfluence: { value: 10.0 },//影響度
        udisplayment: {value:new THREE.TextureLoader().load(Texture)},//画像
      },
      vertexShader:Vertex,
      fragmentShader: Fragment,
      blending: THREE.NormalBlending,
      transparent:true,
    });
    this.plane = new THREE.Points(planeGeometry, planeMaterial);
    this.plane.position.set(0, 0, 0);
    this.scene.add(this.plane);

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