import { MvMesh } from "./MvMesh";
import { Setup } from "./Setup";
import { MvPostEffect } from "./PostEffect";

export class App {
  setup: Setup;
  mvMesh: MvMesh;
  mvPostEffect: MvPostEffect

  constructor() {
    this.setup = new Setup();
    this.mvMesh = new MvMesh(this.setup);
    this.mvPostEffect = new MvPostEffect(this.setup)
  }

  init() {
    this.mvMesh.init();
    this.mvPostEffect.init();
  }

  render() {
    if (!this.setup.scene || !this.setup.camera) return;
    this.mvMesh.raf();
    this.mvPostEffect.raf();
  }

  update() {
    this.mvMesh.updateMesh();
  }

  resize() {
    this.setup.resize();
    this.mvMesh.resize();
  }
}
