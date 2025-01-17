import { MvMesh } from "./MvMesh";
import { Setup } from "./Setup";
import { MvPostEffect } from "./PostEffect";
import { FresnelMesh } from "./FresnelMesh";

export class App {
  setup: Setup;
  mvMesh: MvMesh;
  FresnelMesh: FresnelMesh;
  mvPostEffect: MvPostEffect

  constructor() {
    this.setup = new Setup();
    this.mvMesh = new MvMesh(this.setup);
    this.FresnelMesh = new FresnelMesh(this.setup);
    this.mvPostEffect = new MvPostEffect(this.setup)
  }

  init() {
    this.mvMesh.init();
    this.FresnelMesh.init();
    this.mvPostEffect.init();
  }

  render() {
    if (!this.setup.scene || !this.setup.camera) return;
    this.mvMesh.raf();
    this.FresnelMesh.raf();
    this.mvPostEffect.raf();
  }

  resize() {
    this.setup.resize();
    this.FresnelMesh.resize();
  }
}
