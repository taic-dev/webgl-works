import "../assets/style.css";
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

window.addEventListener('DOMContentLoaded',() => {
  // 時間の経過取得
  const clock = new THREE.Clock();

  // レンダー
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(new THREE.Color(0x000000));
  const canvasElement = document.getElementById("webgl");
  canvasElement.appendChild(renderer.domElement);
  
  // シーン作成
  const scene = new THREE.Scene();
  const axes = new THREE.AxesHelper(25);
  scene.add(axes);
  
  // 地球の作成
  const loader = new THREE.TextureLoader();
  const texture = loader.load("./earth.webp");
  const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x8dc3ff,
    map: texture,
  });
  const sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
  const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphereMesh.position.set(0, 0, 0);
  scene.add(sphereMesh);
  
  // 飛行機の作成
  var fighterAircraftObj;
  var fighterAircraftObjDirection;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    'fighter-aircraft.gltf',
    (obj) => {
      fighterAircraftObj = obj.scene;
      scene.add(fighterAircraftObj);
      fighterAircraftObj.position.set(0, 5.0, 0)
      // 進行方向を設定
      fighterAircraftObjDirection = new THREE.Vector3(5.0, 1.0, 0.0).normalize();
    }
  )
  
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
  
  window.addEventListener("resize", () => {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  
  render();
  
  function render() {    
    requestAnimationFrame(render);
    sphereMesh.rotation.y += 0.003;

    if(!fighterAircraftObj) return
    // 前のフレームまでの進行方向を変数に保存
    const previousDirection = fighterAircraftObjDirection.clone();
    // 前のフレームまでの距離を変数に保存
    const prevDistance = fighterAircraftObj.position.clone();
    // 飛行機の進行方向ベクトルに、向きベクトルを小さくスケールして加算する
    // 加算したことでベクトルの長さが変化するので、単位化してから飛行機の座標に加算する
    const newPos = prevDistance.add(previousDirection.multiplyScalar(1)).normalize().multiplyScalar(5);
    // (終点 - 視点) という計算を行うことで、２点間を結ぶベクトルを定義
    const subVector = new THREE.Vector3().subVectors(newPos, fighterAircraftObj.position);
    // 長さに依存せず、向きだけを考えたい場合はベクトルを単位化する
    subVector.normalize();

    // 進行方向のベクトルに向きベクトルを小さくスケールして加算する
    fighterAircraftObjDirection.add(subVector.multiplyScalar(0.1))

    //  加算したことでベクトルの長さが変化するので、単位化してから人工衛星の座標に加算する
    fighterAircraftObjDirection.normalize();
    const direction = fighterAircraftObjDirection.clone();
    fighterAircraftObj.position.add(direction.multiplyScalar(0.05))
    // 変換前と変換後の２つのベクトルから外積で法線ベクトルを求める
    const normalAxis = new THREE.Vector3().crossVectors(previousDirection, fighterAircraftObjDirection)
    normalAxis.normalize();
    // 変換前と変換後のふたつのベクトルから内積でコサインを取り出す
    const cos = previousDirection.dot(fighterAircraftObjDirection)
    // コサインをラジアンに戻す
    const radians = Math.acos(cos);
    // 求めた法線ベクトルとラジアンからクォータニオンを定義
    const qtn = new THREE.Quaternion().setFromAxisAngle(normalAxis, radians)

    fighterAircraftObj.quaternion.premultiply(qtn);

    // const time = clock.getElapsedTime()
    // const sin = Math.sin(time);
    // const cos = Math.cos(time);

    // fighterAircraftObj.position.set(
    //   cos * -5,
    //   sin * -5,
    //   0
    // )

    renderer.render(scene, camera);
  }
})

