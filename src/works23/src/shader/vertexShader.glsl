uniform float uOffset;
uniform float uTime;

varying vec2 vUv;

float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  float offset = 0.00001;
  float freq = 0.01;

  pos.y = pos.y + sin(pos.y * uOffset * 0.0001)* 0.1;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}