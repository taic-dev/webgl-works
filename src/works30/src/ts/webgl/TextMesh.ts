import * as THREE from "three";
import { Setup } from "./Setup";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import Typeface from "../../fonts/Secular_One_Regular.json"
import { getElementPositionAndSize } from "../utils/getElementSize";

const fontLoader = new FontLoader();
const font = fontLoader.parse(Typeface);

export class TextMesh {
  setup: Setup

  constructor(setup: Setup) {
    this.setup = setup;
  }

  init(string: string, element: HTMLElement) {
    this.setMesh(string, element);
  }

  setMesh(string: string, element: HTMLElement) {
    const text = string;
    const info = getElementPositionAndSize(element);
    const fontSize = info.dom.height * 0.02; // Three.js のスケールに合わせる
    const shapes = font.generateShapes(text, fontSize); 
    const geometry = new THREE.ShapeGeometry(shapes);
        
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.5,
    });
    geometry.computeBoundingBox();

    const mesh = new THREE.Mesh( geometry, material );
    mesh.renderOrder = 1; 

    const bbox = geometry.boundingBox!;
    const textWidth = bbox.max.x - bbox.min.x;
    const textHeight = bbox.max.y - bbox.min.y;

    // DOM のサイズに対するスケール補正
    const scaleX = info.dom.width / textWidth;
    const scaleY = info.dom.height / textHeight;

    // スケールを適用
    mesh.scale.set(scaleX, scaleY, 1);

    // const x = (info.dom.x / window.innerWidth) * 2 - 1;
    // const y = -(info.dom.y / window.innerHeight) * 2 + 1;
    // mesh.position.set(x, y, 0);

    // mesh.scale.set(info.dom.width, info.dom.height, 0)
    mesh.position.set(info.dom.x, info.dom.y, 1);
    this.setup.scene?.add(mesh);
  }
}