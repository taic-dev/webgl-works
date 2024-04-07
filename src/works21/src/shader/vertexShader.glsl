uniform float uPointSize;
uniform float uRatio;
varying vec2 vTexCoords;
attribute vec2 rands;

void main() {
  #include <begin_vertex>

  #include <project_vertex>
  gl_PointSize = uRatio * 2.;

  vTexCoords = position.xy;
}