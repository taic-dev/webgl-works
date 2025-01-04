attribute vec3 TorusKnotPosition;
attribute vec3 SpherePosition;
attribute vec3 BoxPosition;
attribute vec3 ConePosition;
attribute vec3 CylinderPosition;
attribute vec3 TorusPosition;

attribute vec3 rands;
uniform float uTime;
uniform float[7] uPercents;
uniform float uAnimation;

void main () {
  vec3 firstPosition = mix(position, TorusKnotPosition, uPercents[0]);
  vec3 secondPosition = mix(firstPosition, SpherePosition, uPercents[1]);
  vec3 thirdPosition = mix(secondPosition, BoxPosition, uPercents[2]);
  vec3 fourthPosition = mix(thirdPosition, ConePosition, uPercents[3]);
  vec3 fifthPosition = mix(fourthPosition, CylinderPosition, uPercents[4]);
  vec3 finalPosition = mix(fifthPosition, TorusPosition, uPercents[5]);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition * uAnimation, 1.0);
  gl_PointSize = 3.0;
}