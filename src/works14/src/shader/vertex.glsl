attribute vec4 a_position;

void main() {
  vec3 pos = vec3(position.x * 2.0,position.y,position.z);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}