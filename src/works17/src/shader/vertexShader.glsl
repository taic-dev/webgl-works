varying vec2 vUv;
uniform float uTime;

float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  float offset = 1.0;
  float freq = 0.005;
  float amp = 0.1;

  pos.x = pos.x + sin(pos.y * offset + uTime * freq * PI) * amp;

  gl_Position = vec4(pos, 1.0);
}