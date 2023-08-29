import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import handGltfData from './img/hand.gltf'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

window.addEventListener("DOMContentLoaded", () => {
  // レンダー
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0xffffff));
  const canvasElement = document.getElementById("webgl");
  canvasElement.appendChild(renderer.domElement);

  // シーンの作成
  const scene = new THREE.Scene();

  // 手
  let handGltf
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(handGltfData, (gltf) => {
    handGltf = gltf.scene
    handGltf.position.set(0, 0, 0)
    handGltf.rotation.set(0, -4.5, -5)
    scene.add(handGltf)
  })

  // カメラ
  const camera = new THREE.PerspectiveCamera(
    5,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(15, 10, 15)
  camera.lookAt(new THREE.Vector3(0.0, 0.0, 0,0));
  scene.add(camera);
  
  // カメラ操作
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true;
  controls.dampingFactor = 0.2;

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(1, 10, 5);
  scene.add(directionalLight);

  // 自然光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const axesHelper = new THREE.AxesHelper(25);
  scene.add(axesHelper);

  render();

  function render() {
    requestAnimationFrame(render);
    handGltf.rotation.y += 0.001
    renderer.render(scene, camera);
  }
});
