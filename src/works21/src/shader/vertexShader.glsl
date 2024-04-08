uniform float uPointSize;
uniform float uRatio;
varying vec2 vTexCoords;

void main() {
  vec3 vertexDirection = vec3(normalize(position.xy), 0.0);
  vec3 finalPosition = position + vertexDirection * 300. * uRatio;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0 );

  gl_PointSize = uPointSize * 2.;

  vTexCoords = position.xy;
}