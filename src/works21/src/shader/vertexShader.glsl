attribute vec3 rand;

uniform float uPointSize;
uniform float uTime;
uniform float uAnimation;
uniform float uSliderAnimation;
varying vec2 vTexCoords;

void main() {
  float radiusRange = 10.;
  float radiusRandX = radiusRange * sin(uTime * rand.x + rand.y * 5.0);
  float radiusRandY = radiusRange * cos(uTime * rand.x + rand.y * 5.0);
  float radiusRandAll = radiusRandX + radiusRandY;
  float finalRadius = 3.0 + radiusRandAll;

  float moveRange = 0.5;
  float moveRandX = moveRange * sin(uTime * rand.x + rand.y * 5.0);
  float moveRandY = moveRange * cos(uTime * rand.x + rand.y * 5.0) * uSliderAnimation;

  vec3 finalPosition = position + vec3(moveRandX, moveRandY, 0);

  gl_PointSize = finalRadius;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0 );
  
  vTexCoords = position.xy;
}