uniform vec2 uResolution;
uniform sampler2D uFontTexture;
uniform float uFontTextureAspect;
uniform float uPlaneAspect;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uFontTextureAspect, 1.0),
    max((1.0 / uPlaneAspect) / (1.0 / uFontTextureAspect), 1.0)
  );

  vec2 textureUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

    vec4 fontTexture = texture2D(uFontTexture, textureUv);

  vec2 st = gl_FragCoord.xy / uResolution;
  // gl_FragColor = vec4(st.x, st.y, 1.0, 1.0);
  gl_FragColor = fontTexture;
}