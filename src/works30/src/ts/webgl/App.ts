import { FresnelMesh } from "./FresnelMesh";
import { MvMesh } from "./MvMesh";
import { Setup } from "./Setup";

export class App {
  setup: Setup
  mvMesh: MvMesh
  fresnelMesh: FresnelMesh

  constructor() {
    this.setup = new Setup();
    this.mvMesh = new MvMesh(this.setup);
    this.fresnelMesh = new FresnelMesh(this.setup);
  }

  init() {
    this.mvMesh.init();
    this.fresnelMesh.init();
  }

  render() {
    if(!this.setup.scene || !this.setup.camera) return
    this.setup.renderer?.render(this.setup.scene, this.setup.camera)
    this.mvMesh.raf();
    this.fresnelMesh.raf();
    requestAnimationFrame(() => this.render());
  }

  update() {
    this.mvMesh.updateMesh();
  }

  resize() {
    this.setup.resize();
    this.mvMesh.resize();
  }
}