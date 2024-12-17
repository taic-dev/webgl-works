uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;

#pragma glslify: noise2d = require('glsl-noise/simplex/2d');
#pragma glslify: noise3d = require('glsl-noise/simplex/3d');

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

vec3 overlay(vec3 base, vec3 blend) {
  return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
}

vec4 effect() {
  vec2 uv = vPosition.xy;
  uv.x = uv.x + uTime * 0.02;
  uv.y = uv.y + uTime * -0.02;

  vec2 p = vec2(uv);
  p = rotate2d(noise2d(p)) * vec2(-0.05) * 2.5 * uIntensity;
  float n = noise3d(vec3(p.x * 8., p.y, 0.01));

  vec3 finalColor = overlay(vec3(n), vec3(n));
  return vec4(finalColor, 1.);
}

void main() {
  vec4 effect = effect();
  gl_FragColor = effect;
}