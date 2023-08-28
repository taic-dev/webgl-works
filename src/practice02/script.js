import "./style.css";
import * as THREE from "three";
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

  // 眼球
  const eyeGeometry = new THREE.SphereGeometry(5, 64, 32);
  const eyeMaterial = new THREE.MeshLambertMaterial({
    color: 0x8dc3ff,
  });
  const eyeMesh = new THREE.Mesh(eyeGeometry, eyeMaterial);
  eyeMesh.position.set(0, 0, 0);
  scene.add(eyeMesh);

  // カメラ
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(15, 15, 15)
  camera.lookAt(new THREE.Vector3(0.0, 0.0, 0,0));
  scene.add(camera);

  // 平行光源
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
  directionalLight.position.set(1, 5, 5);
  scene.add(directionalLight);

  // 自然光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const axesHelper = new THREE.AxesHelper(25);
  scene.add(axesHelper);

  render();

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
});
