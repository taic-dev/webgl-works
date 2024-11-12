uniform vec2 uResolution;
uniform sampler2D uEffectImage;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d');


vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(2.0, 1.0, 0.0);
  vec3 d = vec3(0.50, 0.20, 0.25);

  return a+b*cos(6.28318*(c*t+d));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

vec3 overlay(vec3 base, vec3 blend) {
  return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
}

float plot(vec2 st) {    
    return smoothstep(0.02, 0.0, abs(st.y - st.x));
}

void main() {
  vec3 fianlColor = vec3(0.0);
  vec3 blendColor = vec3(1.);

  float mouse_num = abs(uMouse.x) + abs(uMouse.y);
  vec2 uv = vUv;
  
  // 斜めにする
  // uv *= rotate2d(1.);

  uv *= 2.;
  uv = fract(uv * 0.5);

  uv = 0.1 / uv;

  fianlColor = palette((sin(uTime * 0.01)));

  fianlColor *= length(uv.x) + palette(mouse_num);
  blendColor *= length(uv.x);

  vec3 color = mix(fianlColor, blendColor, mouse_num);

  gl_FragColor = vec4(color.rgb, 1.0);
}