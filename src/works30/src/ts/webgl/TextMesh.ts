import * as THREE from "three";
import { Setup } from "./Setup";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js"
import Typeface from "../../fonts/Montserrat_Bold.json"
import { getElementPositionAndSize, ElementPositionAndSize } from "../utils/getElementSize";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const fontLoader = new FontLoader();
const font = fontLoader.parse(Typeface);

export class TextMesh {
  setup: Setup
  elements: HTMLElement[] | null
  element: HTMLElement | null
  geometry: TextGeometry | null
  geometries: TextGeometry[]
  mesh: THREE.Mesh | null
  meshes: THREE.Mesh[]

  constructor(setup: Setup) {
    this.setup = setup;
    this.elements = [...document.querySelectorAll<HTMLElement>('.js-mv-title span')];
    this.element = null;
    this.geometry = null
    this.geometries = [];
    this.mesh = null
    this.meshes = [];
  }

  init() {
    this.elements?.forEach((v) => {
      const info = getElementPositionAndSize(v);
      this.setMesh(v.textContent!, info);
    })
  }

  setMesh(string: string, info: ElementPositionAndSize) {
    console.log(info)
    const fontSize = info.dom.height * 0.1;
    console.log(fontSize)
    this.geometry = new TextGeometry(string, {
      font: font,
      size: fontSize,
      height: 0.1,
      curveSegments: 12,
      bevelEnabled: false,
    });
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.5
    });
    this.geometry.computeBoundingBox();
    this.geometries.push(this.geometry)
    this.mesh = new THREE.Mesh( this.geometry, material );
    this.meshes.push(this.mesh);

    // update font size
    const bbox = this.geometry?.boundingBox!;
    const textWidth = bbox.max.x - bbox.min.x;
    this.geometry.translate(-bbox.min.x, -bbox.max.y, 0);

    const scaleX = info.dom.width / textWidth;

    this.mesh?.scale.set(scaleX, scaleX, 1);
    this.mesh.position.set(info.dom.x - info.dom.width / 2, info.dom.y + info.dom.height / 2, 0);

    this.setup.scene?.add(this.mesh);
  }

  updateMesh(info: ElementPositionAndSize, i: number) {      
    // update font size
    const bbox = this.geometries[i]?.boundingBox!;
    const textWidth = bbox.max.x - bbox.min.x;
    this.geometries[i].translate(-bbox.min.x, -bbox.max.y, 0);

    const scaleX = info.dom.width / textWidth;

    this.meshes[i]?.scale.set(scaleX, scaleX, 1);
    this.meshes[i].position.set(info.dom.x - info.dom.width / 2, info.dom.y + info.dom.height / 2, 0);
  }

  resize() {
    this.elements?.forEach((v, i) => {
      const info = getElementPositionAndSize(v);
      this.updateMesh(info, i)
    })
  }
}