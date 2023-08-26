import "../assets/style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// レンダー
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0xeeeeee));
const canvasElement = document.getElementById("webgl");
canvasElement.appendChild(renderer.domElement);

// シーン作成
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper(25);
scene.add(axes);

// メッシュの作成
const loader = new THREE.TextureLoader();
const texture = loader.load('./earth.webp');
const sphereMaterial = new THREE.MeshLambertMaterial({
  color: 0x8dc3ff,
  map: texture,
});
const sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 0, 0);
scene.add(sphereMesh);

// カメラ作成
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100.0
);
camera.position.set(15, 15, 15);
camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.2;

// ライトの作成
// 平方光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(0, 30, 10);
scene.add(directionalLight);
// 環境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

render();

function render() {
  requestAnimationFrame(render);
  sphereMesh.rotation.y += 0.003
  renderer.render(scene, camera);
}
