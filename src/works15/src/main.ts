import { WebGL } from "./webgl";
import Texture from "./image/texture.jpg";

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new WebGL()
  webgl.textureLoad(Texture)
  // webgl.init()
  // webgl.render()
});