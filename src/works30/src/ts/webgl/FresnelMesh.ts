import { gsap } from "gsap";
import * as THREE from "three";
import { Setup } from "./Setup";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export class FresnelMesh {
  setup: Setup;
  mesh: THREE.Mesh | null;
  loader: THREE.TextureLoader | null;
  pointer: THREE.Vector2;

  constructor(setup: Setup) {
    this.setup = setup;
    this.mesh = null;
    this.loader = null;
    this.pointer = new THREE.Vector2(0, 0);
  }

  init() {
    this.setUniforms();
    this.setMesh();
    this.setMouse();
  }

  setUniforms() {
    const commonUniforms = {
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
    };

    return {
      ...commonUniforms,
    };
  }

  async setMesh() {
    const geometry = new THREE.IcosahedronGeometry(130, 10);
    const loader = new RGBELoader();
    try {
      const hdrEquirect = await loader.loadAsync(new URL("../../hdr/empty_warehouse_01_2k.hdr", import.meta.url).href);
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

      const material = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        transmission: 1,
        thickness: 150,
          envMap: hdrEquirect
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.setup.scene?.add(this.mesh);
      this.mesh.position.set(0, 0, 50);
  } catch (error) {
      console.error("HDR texture loading error:", error);
  }
  }

  setMouse() {
    window.addEventListener("pointermove", (e) => {
      if (!this.mesh) return;
      this.pointer.x = e.clientX - window.innerWidth / 2;
      this.pointer.y = -e.clientY + window.innerHeight / 2;

      gsap.to(this.mesh.position, {
        x: this.pointer.x,
        y: this.pointer.y,
        ease: "ease-out",
        duration: 0.6,
      });
    });
  }

  resize() {
    (this.mesh?.material as any).uniforms.uResolution.value.set(
      window.innerWidth,
      window.innerHeight
    );
  }

  raf() {
    if (!this.mesh || !this.setup.renderer || !this.setup.scene) return;
  }
}
