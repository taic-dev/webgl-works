// @ts-ignore
import { DotScreenShader } from "../vendor/CustomShader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import type { Setup } from "./Setup";

export class MvPostEffect {
  setup: Setup;
  composer: EffectComposer | undefined;

  constructor(setup: Setup) {
    this.setup = setup;
  }

  init() {
    if(!this.setup.renderer || !this.setup.scene || !this.setup.camera) return
    this.composer = new EffectComposer(this.setup.renderer)
    this.composer.addPass( new RenderPass( this.setup.scene, this.setup.camera ) );

    const effect = new ShaderPass( DotScreenShader );
    effect.uniforms[ 'scale' ].value = 4;
    this.composer.addPass( effect );
  }

  raf() {
    this.composer?.render();
  }

  updatePost() {
    this.composer?.setSize(window.innerWidth, window.innerHeight);
  }
}