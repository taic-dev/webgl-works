uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform bool uColor;
uniform float uSize;
uniform float uSpeed;

varying vec2 vUv;

#pragma glslify: noise2d = require('glsl-noise/simplex/2d');
#pragma glslify: noise3d = require('glsl-noise/simplex/3d');

float noise(vec2 p) {
  return noise3d(vec3(p.y * uSize + uMouse.y * 2., p.x, uSpeed));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

vec3 overlay(vec3 base, vec3 blend) {
  return mix(2.0 * base * blend, 1.0 - 2.0 * (1.0 - base) * (1.0 - blend), step(0.5, base));
}

vec3 palette(float t) {
  vec3 a = vec3(0.3098, 0.7608, 0.0667);
  vec3 b = vec3(-1.100, -1.100, 0.858);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.6667, 0.0, 0.0);

  return a+b*cos(6.28318*(c*t+d));
}

vec4 effect1(float uSize, float uSpeed) {
  vec2 st = gl_FragCoord.xy/uResolution.xy;
  vec2 p = vec2(vUv * uSize);
  p = rotate2d(noise2d(p)) * vec2((noise2d(vec2(uTime * uSpeed))));
  float n = noise(p);

  return vec4(palette(n), 1.);
}

vec4 effect2(float uSize, float uSpeed) {
  vec2 st = gl_FragCoord.xy/uResolution.xy;
  vec2 p = vec2(vUv * uSize);
  p = rotate2d(noise2d(p)) * vec2((noise2d(vec2(uTime * uSpeed))) * vUv + 1. );
  float n = noise(p);

  return vec4(overlay(vec3(n), vec3(n)), 1.);
}

void main() {
  vec4 effect = uColor ? effect1(uSize, uSpeed) : effect2(uSize, uSpeed);

  gl_FragColor = effect;
}