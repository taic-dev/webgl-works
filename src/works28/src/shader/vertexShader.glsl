uniform float uTime;
varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  // pos.x = pos.x - sin(pos.y * 2.5 * PI * uTime * 0.001) * 10.;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}