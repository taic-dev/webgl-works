class Lb {
  constructor() {
    (this.camera = new THREE.PerspectiveCamera({
      fovy: 70,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.001,
      far: 1e3,
    })),
      this.camera.position.set(0, 0, 2);
  }
}
var Ib = `varying vec2 vUv;
void main() {
	vUv = uv;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  Db = `uniform float time;
uniform float progress;
uniform float intensity;
uniform float width;
uniform float scaleX;
uniform float scaleY;
uniform float transition;
uniform float radius;
uniform float swipe;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D displacement;

uniform vec4 resolution;
varying vec2 vUv;

mat2 getRotM(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}

const float PI = 3.1415;
const float angle1 = PI *0.25;
const float angle2 = -PI *0.75;

void main()	{
  
  vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

  
  vec4 disp = texture2D(displacement, newUV);
  vec2 dispVec = vec2(disp.r, disp.g);

  
  vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
  vec4 t1 = texture2D(texture1, distortedPosition1);

  
  vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
  vec4 t2 = texture2D(texture2, distortedPosition2);

  
  gl_FragColor = mix(t1, t2, progress);
}`;

class Ub {
  constructor(t) {
    (this.scene = new THREE.Scene()),
      (this.material = new THREE.ShaderMaterial({
        extensions: {
          derivatives: "#extension GL_OES_standard_derivatives : enable",
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: { type: "f", value: 0 },
          progress: { type: "f", value: 0 },
          border: { type: "f", value: 0 },
          intensity: { type: "f", value: 0 },
          scaleX: { type: "f", value: 40 },
          scaleY: { type: "f", value: 40 },
          transition: { type: "f", value: 40 },
          swipe: { type: "f", value: 0 },
          width: { type: "f", value: 0 },
          radius: { type: "f", value: 0 },
          texture1: { type: "f", value: t[0] },
          texture2: { type: "f", value: t[1] },
          displacement: {
            type: "f",
            value: new THREE.TextureLoader().load(
              "/works/01/assets/img/displacement.jpg"
            ),
          },
          resolution: { type: "v4", value: new THREE.Vector4() },
        },
        vertexShader: Ib,
        fragmentShader: Db,
      })),
      (this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2)),
      (this.plane = new THREE.Mesh(this.geometry, this.material)),
      this.scene.add(this.plane);
  }
}
class Nb {
  constructor(t) {
    (this.renderer = new THREE.WebGLRenderer()),
      (this.width = window.innerWidth),
      (this.height = window.innerHeight),
      this.renderer.setPixelRatio(window.devicePixelRatio),
      this.renderer.setSize(this.width, this.height),
      this.renderer.setClearColor(15658734, 1),
      t.appendChild(this.renderer.domElement);
  }
}
class Ob {
  constructor() {
    (this.$container = document.querySelector("[data-slider]")),
      (this.$prev = document.querySelector("[data-slider-prev]")),
      (this.$next = document.querySelector("[data-slider-next]")),
      (this.imageData = JSON.parse(
        this.$container.getAttribute("data-images")
      )),
      (this.cameraInstance = new Lb()),
      (this.rendererInstance = new Nb(this.$container)),
      (this.uniforms = { intensity: { value: 1, type: "f", min: 0, max: 3 } }),
      (this.time = 0),
      (this.current = 0),
      (this.textures = []),
      (this.paused = !0),
      this.init(() => {
        (this.meshInstance = new Ub(this.textures)),
          this.bindEventListeners(),
          this.settings(),
          this.onResize(),
          this.play();
      });
  }
  async init(t) {
    const e = this.imageData.map(async (n, i) => {
      this.textures[i] = await new THREE.TextureLoader().loadAsync(n);
    });
    await Promise.all(e), t();
  }
  bindEventListeners() {
    this.$prev.addEventListener("click", () => this.prevImage()),
      this.$next.addEventListener("click", () => this.nextImage()),
      window.addEventListener("resize", this.onResize.bind(this));
  }
  settings() {
    (this.settings = { progress: 0.5 }),
      Object.keys(this.uniforms).forEach((t) => {
        this.settings[t] = this.uniforms[t].value;
      });
  }
  play() {
    (this.paused = !1), this.render();
  }
  prevImage() {
    if (this.isRunning) return;
    this.isRunning = !0;
    const t = (this.current - 1 + this.textures.length) % this.textures.length,

      e = this.textures[t];
      
    (this.meshInstance.material.uniforms.texture2.value =
      this.textures[this.current]),

      (this.meshInstance.material.uniforms.progress.value = 1),

      gsap.to(this.meshInstance.material.uniforms.progress, {
        duration: 1,
        value: 0,
        ease: "power2.inOut",
        onStart: () => {
          this.meshInstance.material.uniforms.texture1.value = e;
        },
        onComplete: () => {
          (this.current = t),
            (this.meshInstance.material.uniforms.progress.value = 0),
            (this.isRunning = !1);
        },
      });
  }

  nextImage() {
    if (this.isRunning) return;
    this.isRunning = !0;
    const t = (this.current + 1) % this.textures.length,
      e = this.textures[t];
    (this.meshInstance.material.uniforms.texture2.value = e),
      gsap.to(this.meshInstance.material.uniforms.progress, {
        duration: 1,
        value: 1,
        ease: "circ.inOut",
        onComplete: () => {
          (this.current = t),
            (this.meshInstance.material.uniforms.texture1.value = e),
            (this.meshInstance.material.uniforms.progress.value = 0),
            (this.isRunning = !1);
        },
      });
  }
  render() {
    this.paused ||
      ((this.time += 0.05),
      (this.meshInstance.material.uniforms.time.value = this.time),
      Object.keys(this.uniforms).forEach((t) => {
        this.meshInstance.material.uniforms[t].value = this.settings[t];
      }),
      requestAnimationFrame(() => this.render()),
      this.rendererInstance.renderer.render(
        this.meshInstance.scene,
        this.cameraInstance.camera
      ));
  }
  onResize() {
    const t = window.innerWidth,
      e = window.innerHeight;
    this.rendererInstance.renderer.setSize(t, e),
      (this.cameraInstance.camera.aspect = t / e);
    const n = this.textures[0].image.height / this.textures[0].image.width,
      [i, s] = e / t > n ? [(t / e) * n, 1] : [1, e / t / n];
    Object.assign(this.meshInstance.material.uniforms.resolution.value, {
      x: t,
      y: e,
      z: i,
      w: s,
    });
    const a = this.cameraInstance.camera.position.z,
      o = 1;
    (this.cameraInstance.camera.fov =
      2 * (180 / Math.PI) * Math.atan(o / (2 * a))),
      this.meshInstance.plane.scale.set(
        this.cameraInstance.camera.aspect,
        1,
        1
      ),
      this.cameraInstance.camera.updateProjectionMatrix();
  }
}
window.THREE = wb;
window.gsap = Pb;
window.addEventListener("DOMContentLoaded", () => {
  new cu(), new Ob();
});
