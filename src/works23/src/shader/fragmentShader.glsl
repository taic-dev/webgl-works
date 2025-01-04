uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform vec2 uOffset;

varying vec2 vUv;

void main() {
  float offset = 0.5;

  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec2 finalUv = vec2(
    fract(fixedUv.x * cos(uOffset.x * fixedUv.x)), 
    fract(fixedUv.y * cos(uOffset.y * fixedUv.y))
  );

  vec4 texture = texture2D(uTexture, finalUv);

  gl_FragColor = vec4(texture);
}