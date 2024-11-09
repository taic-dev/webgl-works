uniform vec2 uResolution;
uniform sampler2D uDisplacement;
uniform sampler2D uFontTexture;
uniform float uFontTextureAspect;
uniform float uPlaneAspect;
uniform float uTime;

varying vec2 vUv;

const float displacementCoef = 0.001;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uFontTextureAspect, 1.0),
    max((1.0 / uPlaneAspect) / (1.0 / uFontTextureAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec4 displacementTexture = texture2D(uDisplacement, vUv);
  float displacementForce = displacementTexture.r * sin(uTime) * 1000. * displacementCoef;
  vec2 uvDisplaced = vec2(fixedUv.x, fixedUv.y + displacementForce);
  vec4 displacedTexture = texture2D(uFontTexture, uvDisplaced);

  vec2 st = gl_FragCoord.xy / uResolution;
  vec4 fontTexture = texture2D(uFontTexture, fixedUv);

  gl_FragColor = vec4(displacedTexture.r, displacedTexture.g, displacedTexture.b, displacedTexture.a);
}