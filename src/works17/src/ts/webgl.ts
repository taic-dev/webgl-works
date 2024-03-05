import * as THREE from "three";
import { PARAMS } from './params';

export class Webgl {
  [x: string]: any;

  constructor() {
    this.renderer
  }

  init() {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(PARAMS.WINDOW.WIDTH, PARAMS.WINDOW.HEIGHT);
    const wrapper = document.querySelector('.webgl');
    wrapper?.appendChild(this.renderer.domElement);
  }

  render() {
    requestAnimationFrame(this.render);
  }
}