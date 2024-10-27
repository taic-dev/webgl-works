varying vec2 vUv;
uniform vec2 uOffset;
uniform float uTime;

float PI = 3.141529;

vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset){
    position.x =  position.x + (sin(vUv.y * PI) * offset.x);
    position.y =  position.y + (sin(vUv.x * PI) * offset.y);
    return position;
}

void main() {
  vUv = uv;
  vec3 pos = deformationCurve(position, vUv, uOffset);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}