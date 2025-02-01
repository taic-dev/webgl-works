import { FresnelMesh } from "./FresnelMesh";
import { MvMesh } from "./MvMesh";
import { Setup } from "./Setup";
import { TextMesh } from "./TextMesh";

export class App {
  setup: Setup
  mvMesh: MvMesh
  fresnelMesh: FresnelMesh
  textMesh: TextMesh

  constructor() {
    this.setup = new Setup();
    this.mvMesh = new MvMesh(this.setup);
    this.textMesh = new TextMesh(this.setup);
    this.fresnelMesh = new FresnelMesh(this.setup);

    console.log(this.setup.scene)
  }

  init() {
    this.mvMesh.init();
    this.textMesh.init('WebGL\nLens Refraction', document.querySelector('.mv__title')!);
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