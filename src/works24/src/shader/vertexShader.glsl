uniform float uLoading;
uniform vec2 uOffset;

varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main() {
  vUv = uv;
  vec3 pos = position;

  if(uLoading > 0.0) {
    pos.x = pos.x + sin(pos.y * PI) * 1.0 * uLoading;
    pos.y = pos.y + sin(pos.x * PI) * 1.0 * -uLoading;
  }else {
    pos.x = pos.x + sin(pos.y * PI + uOffset.x * 0.1 ) * 0.01 * uOffset.x;
    pos.y = pos.y + sin(pos.x * PI + uOffset.y * 0.1 ) * 0.01 * uOffset.y;
  };


  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}