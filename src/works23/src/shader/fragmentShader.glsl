uniform sampler2D uTexture;
uniform sampler2D uDisplacement;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uOffset;

varying vec2 vUv;

const float displacementCoef = 0.001;
const float brightnessCoef = 0.0008;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec4 displacementTexture = texture2D(uDisplacement, vUv);

  float displacementForce = displacementTexture.r * uOffset * displacementCoef;
  vec2 uvDisplaced = vec2(fixedUv.x, fixedUv.y + displacementForce);
  vec4 displacedTexture = texture2D(uTexture, uvDisplaced);

  float r = displacedTexture.r + abs(uOffset * brightnessCoef);
  float g = displacedTexture.g + abs(uOffset * brightnessCoef);
  float b = displacedTexture.b + abs(uOffset * brightnessCoef);

  gl_FragColor = vec4(vec3(r, g, b), 1.0);
}