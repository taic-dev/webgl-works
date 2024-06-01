uniform float uTwist;
uniform float uTime;
uniform float uAmplitude;
uniform bool uAnimation;

varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main() {
  vec3 pos = position;
  vUv = uv;
  
  pos.z = sin(pos.x * uTime * 0.015 * PI) * uAmplitude;
  pos.z*=2.5;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}