attribute vec3 rands;
uniform float uTime;
uniform float uAnimation;

void main () {
  float time = uTime * 0.01;
  float moveRange = 0.5;
  float posX = moveRange * sin(time + rands.x * rands.y);
  float posY = moveRange * sin(time + rands.y * rands.z);
  float posZ = moveRange * sin(time + rands.z * rands.x);
  vec3 fainalPosition = vec3(posX, posY, posZ) + position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(fainalPosition * uAnimation, 1.0);
  gl_PointSize = 3.0;
}