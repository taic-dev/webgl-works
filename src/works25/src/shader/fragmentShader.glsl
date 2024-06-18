uniform vec2 uResolution;
uniform sampler2D uFrontTexture;
uniform sampler2D uTextureBack;
uniform sampler2D uEffectTexture1;
uniform sampler2D uEffectTexture2;
uniform float uImageAspect;
uniform float uPlaneAspect;
uniform vec2 uMouse;
uniform float uTime;
uniform float uIndex;

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

  vec4 frontTexture = texture2D(uFrontTexture, textureUv);
  
  vec4 frontColor;
  if(uIndex == 1.) {
    vec4 effectTexture1 = texture2D(uEffectTexture1, vec2(textureUv.x * 15., textureUv.y * 10.));
    vec3 se_effect = overlay(effectTexture1.rgb, customNoise * 1.2);
    vec3 blendedColor1 = overlay(frontTexture.rgb, se_effect.rgb);
    frontColor = mix(frontTexture, vec4(blendedColor1, 1.), abs(uMouse.x * 2.));
  } else if(uIndex == 2.) {
    vec4 effectTexture2 = texture2D(uEffectTexture2, textureUv + abs(uMouse.x) );
    vec3 blendedColor2 = overlay(frontTexture.rgb, effectTexture2.rgb);
    frontColor = mix(frontTexture, vec4(blendedColor2, 1.0), abs(uMouse.y * 1.5));
  } else if(uIndex == 3.) {
    frontColor = frontTexture;
  }

  vec4 backColor = texture2D(uTextureBack, textureUv);

  vec4 finalColor = gl_FrontFacing ? frontColor : backColor;

  gl_FragColor = vec4(finalColor);
}