uniform float uPointSize;
varying vec2 vTexCoords;

varying vec2 vUv;
varying vec2 pos;

void main() {
  // vUv = uv;
  // vec3 pos = position;
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

  #include <begin_vertex>

  #include <project_vertex>
  gl_PointSize = uPointSize;

  vTexCoords = position.xy;
}