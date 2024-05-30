uniform float uTwist;

varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 pos = position;

  pos.y = pos.y + sin(pos.x * uTwist * 0.05) * 0.05;
  pos.x = pos.x + sin(pos.y * uTwist * 0.09) * 0.05;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}