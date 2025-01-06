import { Webgl } from "../../../works16/src/ts/webgl"

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new Webgl()
  webgl.init();
  webgl.render();
})