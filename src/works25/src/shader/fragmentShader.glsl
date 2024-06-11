uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uTime;

varying vec2 vUv;

const float displacementCoef = 0.5;
const float uOffset = 0.005;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);

  vec2 q = mod(uv, 0.2) -0.1;

  float ip = 0.;
  float c = 0.;
  for(float i=0.; i<10.; i++) {
    ip = dot(1., i);
    c += length(q * 5.) + cos(uTime * 0.5);
  }

  vec3 col = vec3(sin(abs(pow(c, 2.)) / ip * 0.5));

  // 画像のアスペクトとプレーンのアスペクトを比較し、短い方に合わせる
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  // 計算結果を用いて補正後のuv値を生成
  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.6
  );

  float displacementForce = col.r * uOffset * displacementCoef;
  // float displacementForce = col.r * sin(uTime * 0.01) * displacementCoef;
  vec2 uvDisplaced = vec2(fixedUv.x + displacementForce, fixedUv.y + displacementForce);
  vec4 displacedTexture = texture2D(uTexture, uvDisplaced);

  gl_FragColor = vec4(displacedTexture);
  // gl_FragColor = vec4(vec3(col), 1.);
}