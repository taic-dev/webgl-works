import { Webgl } from "../../../works15/src/ts/webgl"

window.addEventListener('DOMContentLoaded', () => {
  const webgl = new Webgl()
  webgl.init();
  webgl.render();
})