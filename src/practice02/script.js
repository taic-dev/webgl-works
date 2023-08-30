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

  // マウスのカーソルに対して動くようにする
  window.addEventListener('mousemove', (e) => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    
    const clientX = e.clientX
    const clientY = e.clientY

    // 座標を変換
    const x = (clientX / innerWidth) * 2 -1
    const y = (clientY / innerHeight) * 2 -1

    console.log(x, y)
    handGltf.rotation.x += x * 0.001
    handGltf.rotation.y += y * 0.001

    camera.lookAt(new THREE.Vector3(x * 0.03, y * 0.03, 0,0));
  })

  // 画面のリサイズ
  window.addEventListener('resize', () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth / window.innerHeight);
    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  })
  
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

  // 軸ヘルパー
  // const axesHelper = new THREE.AxesHelper(25);
  // scene.add(axesHelper);

  render();

  function render() {
    requestAnimationFrame(render);

    if(!handGltf) return
    handGltf.rotation.y += 0.001
    renderer.render(scene, camera);
  }
});
