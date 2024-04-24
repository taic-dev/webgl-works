varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uImageAspect;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMousePointer;

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

  float r = texture2D(uTexture, fixedUv + sin(uMousePointer.x) ).r;
  float g = texture2D(uTexture, fixedUv).g ; 
  float b = texture2D(uTexture, fixedUv).b ;

  vec3 rgb = vec3(r, g, b);

  gl_FragColor = vec4(rgb, 1.0);
}
