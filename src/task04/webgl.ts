import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MOVIE_LIST } from "./constants/artList";

export class WebGL {
  [x: string]: any;
  static get RENDERER_PARAM() {
    return {
      clearColor: 0xffffff,
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
      z: 5.0,
      lookAt: new THREE.Vector3(),
    };
  }

  static get DIRECTIONAL_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 1.0,
      x: 0.0,
      y: 5.0,
      z: 5.0,
    };
  }

  static get AMBIENT_LIGHT_PARAM() {
    return {
      color: 0xffffff,
      intensity: 1.0,
    };
  }

  static get PLATFORM_PLANE_GEOMETERY_PARAM() {
    return {
      width: 100,
      height: 100,
      color: 0xffffff,
    };
  }

  static get PLANE_GEOMETERY_PARAM() {
    return {
      width: 1.5,
      height: 1,
    };
  }

  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.directionalLight;
    this.ambientLight;
    this.platformPlane;
    this.plane;
    this.planeArray = [];
    this.planeUuid;
    this.isClicked = false;
    this.controls;
    this.axesHelper;

    // 再帰呼び出しのための this 固定
    this.render = this.render.bind(this);

    this.raycaster = new THREE.Raycaster();
    window.addEventListener("click", (event) => {
      const x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      const y = (event.clientY / window.innerHeight) * 2.0 - 1.0;
      const v = new THREE.Vector2(x, -y);

      this.raycaster.setFromCamera(v, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planeArray);
      console.log(intersects);

      if (intersects.length > 0) {
        const intersect = intersects[0].object;

        if (!this.isClicked) {
          gsap.to(intersect.rotation, { y: 6.25, z: -0.1 });
          gsap.to(intersect.position, { x: 0, y: 0, z: 2.5 });
          
          // 中心を映す
          gsap.to(this.camera.position, { x: 0, y: 0 })
          this.camera.lookAt(new THREE.Vector3(0, 0, 0))
          this.isClicked = true;
        } else {
          gsap.to(intersect.rotation, { y: 0, z: 0 });
          gsap.to(intersect.position, {
            x: Math.random() * 2,
            y: Math.random() * 2,
            z: 0,
          });
          this.isClicked = false;
        }
      }
    });

    window.addEventListener("pointermove", (event) => {
      const x = (event.clientX / window.innerWidth) * 2.0 - 1.0;
      const y = (event.clientY / window.innerHeight) * 2.0 - 1.0;
      const v = new THREE.Vector2(x, -y);

      this.camera.position.x += (x - this.camera.position.x) * 0.05;
      this.camera.position.y += (-y - this.camera.position.y) * 0.05;
      // this.camera.lookAt(
      //   new THREE.Vector3(this.camera.position.x, this.camera.position.y, 0)
      // );

      this.raycaster.setFromCamera(v, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planeArray);

      if(!this.isClicked) {
        if (intersects.length > 0) {
          const object = intersects[0].object;
          console.log(object);
          if (object) {
            gsap.to(object.scale, { x: 1.3, y: 1.3, duration: 1, });
          }
        } else {
          this.planeArray.forEach((plane: { scale: gsap.TweenTarget }) => {
            gsap.to(plane.scale, { x: 1, y: 1, duration: 1, });
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

    // platformPlane
    const platformPlaneGeometery = new THREE.PlaneGeometry(
      WebGL.PLATFORM_PLANE_GEOMETERY_PARAM.width,
      WebGL.PLATFORM_PLANE_GEOMETERY_PARAM.height
    );
    const platformPlaneMaterial = new THREE.MeshPhongMaterial({
      color: WebGL.PLATFORM_PLANE_GEOMETERY_PARAM.color,
    });
    this.platformPlane = new THREE.Mesh(
      platformPlaneGeometery,
      platformPlaneMaterial
    );
    this.platformPlane.position.set(0, 0, -1);
    this.scene.add(this.platformPlane);

    // plane
    const loader = new THREE.TextureLoader();
    const planeGeometry = new THREE.PlaneGeometry(
      WebGL.PLANE_GEOMETERY_PARAM.width,
      WebGL.PLANE_GEOMETERY_PARAM.height
    );
    MOVIE_LIST.forEach((movieData) => {
      const texture = loader.load(movieData.imgUrl);
      const planeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffffff,
        map: texture,
      });
      this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
      this.planeArray.push(this.plane);
      this.plane.position.set(Math.random() * 3, Math.random() * 3, 0);
      this.plane.movieData = movieData;
      this.scene.add(this.plane);
    });

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
