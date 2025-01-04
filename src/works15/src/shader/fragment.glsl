varying vec2 vUv;
uniform float uScreenAspect;

uniform sampler2D uTexture1;
uniform sampler2D uTexture2;

uniform float uTextureAspect;
uniform sampler2D uDisplacementTexture;
uniform float uOffset;

const float displacementCoef = 0.5;

void main() {
  vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

  vec2 ratio = vec2(
    min(uScreenAspect / uTextureAspect, 1.0),
    min(uTextureAspect / uScreenAspect, 1.0)
  );

  vec2 textureUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  // texture1
  float displacementForce1 = displacementTexture.r * uOffset * displacementCoef;
  vec2 uvDisplaced1 = vec2(textureUv.x + displacementForce1, textureUv.y + displacementForce1);
  vec4 displacedTexture1 = texture2D(uTexture1, uvDisplaced1);

  // texture2
  float displacementForce2 = displacementTexture.r * (1.0 - uOffset) * displacementCoef;
  vec2 uvDisplaced2 = vec2(textureUv.x + displacementForce2, textureUv.y + displacementForce2);
  vec4 displacedTexture2 = texture2D(uTexture2, uvDisplaced2);

  gl_FragColor = mix(displacedTexture1, displacedTexture2, uOffset);
}