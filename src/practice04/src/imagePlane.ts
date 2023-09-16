export class ImagePlane {
  constructor(mesh, img) {
    this.refImage = img; // 参照するimg要素
    this.mesh = mesh;
  }

  setParams() {
    // 参照するimg要素から大きさ、位置を取得してセットする
    const rect = this.refImage.getBoundingClientRect();

    this.mesh.scale.x = rect.width;
    this.mesh.scale.y = rect.height;

    // window座標をWebGL座標に変換
    const x = rect.left - window.innerWidth / 2 + rect.width / 2;
    const y = -rect.top + window.innerHeight / 2 - rect.height / 2;
    this.mesh.position.set(x, y, this.mesh.position.z);
  }

  update() {
    this.setParams();

    this.mesh.material.uniforms.uTime.value++;
  }
}
