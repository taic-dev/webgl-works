uniform vec2 uResolution;
uniform sampler2D uEffectImage;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

#pragma glslify: random = require('glsl-random');

void main() {
  
  gl_FragColor = vec4(vec3(random(gl_FragCoord.xy / uResolution.xy * uTime)), 1.0 );
}