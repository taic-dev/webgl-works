uniform vec2 uResolution;
uniform sampler2D uFrontTexture1;
uniform sampler2D uFrontTexture2;
uniform sampler2D uFrontTexture3;
uniform sampler2D uTextureBack;
uniform sampler2D uEffectTexture1;
uniform sampler2D uEffectTexture2;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    max((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 textureUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec4 frontTexture1 = texture2D(uFrontTexture1, textureUv);
  vec4 frontTexture2 = texture2D(uFrontTexture2, textureUv);
  vec4 frontTexture3 = texture2D(uFrontTexture3, textureUv);
  
  vec4 effectTexture1 = texture2D(uEffectTexture1, textureUv * abs(uMouse.x * 2.));
  vec4 effectTexture2 = texture2D(uEffectTexture2, textureUv * abs(uMouse.x * 2.));
  
  vec4 frontColor1 = mix(frontTexture1, effectTexture1, abs(uMouse.y * 0.5));
  vec4 frontColor2 = mix(frontTexture2, effectTexture2, abs(uMouse.y));
  vec4 frontColor3 = frontTexture3;

  vec4 backColor = texture2D(uTextureBack, textureUv);

  vec4 finalColor = gl_FrontFacing ? frontColor1 : backColor;

  gl_FragColor = vec4(finalColor);
  // gl_FragColor = vec4(vec3(effect), 1.);
}