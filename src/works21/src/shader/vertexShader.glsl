attribute vec3 rand;

uniform float uPointSize;
uniform float uTime;
uniform float uAnimation;
uniform float uSliderAnimation;
varying vec2 vTexCoords;

void main() {
  float radiusRange = 5.;
  float radiusRandX = radiusRange * sin(uTime * rand.x + rand.y * 5.0);
  float radiusRandY = radiusRange * cos(uTime * rand.x + rand.y * 5.0);
  float radiusRandAll = radiusRandX + radiusRandY;
  float finalRadius = 3.0 + radiusRandAll;

  float moveRange = uSliderAnimation;
  float moveRandX = moveRange * sin(uTime * rand.x + rand.y * 5.0);
  float moveRandY = moveRange * cos(uTime * rand.x + rand.y * 5.0);

  vec3 finalPosition = position + vec3(moveRandX, moveRandY, 0);

  gl_PointSize = finalRadius;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0 );
  
  vTexCoords = position.xy;
}