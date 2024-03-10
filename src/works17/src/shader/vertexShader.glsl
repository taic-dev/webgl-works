varying vec2 vUv;
uniform float uTime;

float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  // 横方向
  float amp = 0.03;
  float freq = 0.01 * uTime;

  // 縦方向
  float tension = -0.001 * uTime;

  pos.x = pos.x + sin(pos.y * PI  * freq) * amp;
  pos.y = pos.y + (cos(pos.x * PI) * tension);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}