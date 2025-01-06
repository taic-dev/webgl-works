uniform sampler2D uDisplacement;
uniform sampler2D uTexture;
uniform vec2 uTextureSize;
uniform vec2 uPlaneSize;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

vec2 mirrored(vec2 v) {
  vec2 m = mod(v, 2.0);
  return mix(m, 2.0 - m, step(1.0, m));
}

void main() {
  vec2 uv = vUv;

  vec2 ratio = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uTextureSize.x / uTextureSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uTextureSize.y / uTextureSize.x), 1.0)
  );

  uv += -0.5;
  uv *= ratio;
  uv += 0.5;

  vec4 depthTexture = texture2D(uDisplacement, uv);
  vec4 originalTexture = texture2D(uTexture, mirrored(uv + uMouse * 0.03 * (depthTexture.r - 0.5)));

  gl_FragColor = vec4(originalTexture.r, originalTexture.g, originalTexture.b, 1.0);
}