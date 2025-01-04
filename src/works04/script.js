import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import handGltfData from './img/hand.gltf'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

window.addEventListener("DOMContentLoaded", () => {
  // マウス追尾
  const stkr = document.querySelector('.stkr');
  window.addEventListener('mousemove', (e) => {
    stkr.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  })

  // レンダー
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight - 100);
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
    scene.add(handGltf)
  })
  
  // カメラ
  const camera = new THREE.PerspectiveCamera(
    4.5,
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

    // 手の向く方向ベクトルを変更してみる
    const heightOnOrigin = (Math.tan(((15 * Math.PI / 180) / 2)) * 50 * 2)
    const widthOnOrigin = heightOnOrigin * (window.innerWidth / window.innerHeight);
    handGltf.lookAt(new THREE.Vector3(x * widthOnOrigin, y * heightOnOrigin, 50))

    camera.lookAt(new THREE.Vector3(x * 0.03, y * 0.03, 0,0));
  })

  // 画面のリサイズ
  window.addEventListener('resize', () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth / window.innerHeight);
    // camera.aspect = window.innerWidth / window.innerHeight - 100;
    // camera.updateProjectionMatrix();
    // camera.lookAt(new THREE.Vector3(0.0, 0.0, 0,0));
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
    renderer.render(scene, camera);
  }
});