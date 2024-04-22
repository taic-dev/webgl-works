varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uImageAspect;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uTime;

void main() {

  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  // 計算結果を用いて補正後のuv値を生成
  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec3 texture = texture2D(uTexture, fixedUv).rgb;
  gl_FragColor = vec4(texture, 1.0);
}
