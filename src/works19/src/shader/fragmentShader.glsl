varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform float uProgress;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    min((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 fixedUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec4 color1 = texture2D(uTexture, fixedUv);
  vec4 color2 = texture2D(uTexture, vec2(uProgress, fixedUv.y));
  vec4 final = mix(color2, color1, step(fixedUv.x, uProgress));

  gl_FragColor = vec4(final);
}