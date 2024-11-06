uniform vec2 uResolution;
uniform sampler2D uOriginalImage;
uniform sampler2D uDepthImage;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 st = gl_FragCoord.xy / uResolution;

  vec4 depthTexture = texture2D(uDepthImage, vUv);
  vec4 originalTexture = texture2D(uOriginalImage, vUv + uMouse * depthTexture.r * 0.1);

  gl_FragColor = vec4(originalTexture.r, originalTexture.g, originalTexture.b, 1.0);
}