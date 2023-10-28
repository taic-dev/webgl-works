export default `varying vec2 vUv;
uniform float uTime;

float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  float offset = 0.05;
  float freq = 0.05;
  float amp = 1.0;
  pos.x = pos.x + sin(pos.x * offset + uTime * freq * PI) * amp;
  pos.y = pos.y + sin(pos.y * offset + uTime * freq * PI) * amp;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}`