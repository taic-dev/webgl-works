uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uOffset;

varying vec2 vUv;


void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  float n = 0.001;

  float colorR = texture2D(uTexture, fixedUv).r + abs(uOffset) * n;
  float colorG = texture2D(uTexture, fixedUv).g + abs(uOffset) * n;
  float colorB = texture2D(uTexture, fixedUv).b + abs(uOffset) * n;
  gl_FragColor = vec4(vec3(colorR, colorG, colorB), 1.0);
  
}