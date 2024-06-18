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

// ノイズ
float noise(vec2 xy) {
  return fract(sin(dot(xy, vec2(12.9898, 78.2323))) * 43758.5453123 + (uMouse.x + uMouse.y));
}

// 加算ブレンド
vec3 overlay(vec3 base, vec3 blend) {
    return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
}

void main() {
  vec2 ratio = vec2(
    min(uPlaneAspect / uImageAspect, 1.0),
    max((1.0 / uPlaneAspect) / (1.0 / uImageAspect), 1.0)
  );

  vec2 textureUv = vec2(
    (vUv.x - 0.5) * ratio.x + 0.5,
    (vUv.y - 0.5) * ratio.y + 0.5
  );

  vec2 pos = gl_FragCoord.xy;
  pos += floor(60.0);
  vec3 customNoise = vec3(noise(pos.xy / uResolution));

  vec4 frontTexture1 = texture2D(uFrontTexture1, textureUv);
  vec4 frontTexture2 = texture2D(uFrontTexture2, textureUv);
  vec4 frontTexture3 = texture2D(uFrontTexture3, textureUv);
  
  vec4 effectTexture1 = texture2D(uEffectTexture1, vec2(textureUv.x * 15., textureUv.y * 10.));
  vec4 effectTexture2 = texture2D(uEffectTexture2, textureUv + abs(uMouse.x) );

  vec3 mixmix = overlay(effectTexture1.rgb, customNoise * 1.2);
  vec3 blendedColor1 = overlay(frontTexture1.rgb, mixmix.rgb);
  
  vec3 blendedColor2 = overlay(frontTexture2.rgb, effectTexture2.rgb);

  vec4 frontColor1 = mix(frontTexture1, vec4(blendedColor1, 1.), abs(uMouse.x + uMouse.y * 1.1));
  vec4 frontColor2 = mix(frontTexture2, vec4(blendedColor2, 1.0), abs(uMouse.y * 1.5));
  vec4 frontColor3 = frontTexture3;

  vec4 backColor = texture2D(uTextureBack, textureUv);

  vec4 finalColor = gl_FrontFacing ? frontColor1 : backColor;

  gl_FragColor = vec4(finalColor);
  // gl_FragColor = vec4(vec3(mixmix), 1.);
}