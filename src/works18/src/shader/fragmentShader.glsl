varying vec2 vUv;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform sampler2D uDisplacementTexture;
uniform float uOffset;

const float displacementCoef = 0.5;

void main(){
  vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

  // 画像のアスペクトとプレーンのアスペクトを比較し、短い方に合わせる
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  // 計算結果を用いて補正後のuv値を生成
  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  // texture1
  float displacementForce1 = displacementTexture.r * uOffset * displacementCoef;
  vec2 uvDisplaced1 = vec2(fixedUv.x + displacementForce1, fixedUv.y + displacementForce1);
  vec4 displacedTexture1 = texture2D(uTexture1, uvDisplaced1);

  // texture2
  float displacementForce2 = displacementTexture.r * (1.0 - uOffset) * displacementCoef;
  vec2 uvDisplaced2 = vec2(fixedUv.x + displacementForce2, fixedUv.y + displacementForce2);
  vec4 displacedTexture2 = texture2D(uTexture2, uvDisplaced2);

  vec3 texture = texture2D(uTexture1, fixedUv).rgb;

  gl_FragColor = mix(displacedTexture1, displacedTexture2, uOffset);
}