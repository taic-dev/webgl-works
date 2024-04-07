varying vec2 vUv;
uniform float uPlaneAspect;
uniform sampler2D uTexture;
varying vec2 vTexCoords;
uniform float uNbColumns;
uniform float uNbLines;

float circle(vec2 uv, float border) {
  float radius = 0.5;
  float dist = radius - distance(uv, vec2(0.5));
  return smoothstep(0.0, border, dist);
}

void main() {

  vec2 uv = gl_PointCoord;
  uv.y *= -1.;

  uv /= vec2(uNbColumns, uNbLines);
  float texOffsetU = vTexCoords.x / uNbColumns;
  float texOffsetV = vTexCoords.y / uNbLines;
  uv = vec2(texOffsetU, texOffsetV);
  uv += vec2(0.5);

  vec4 texture = texture2D(uTexture, uv);

  gl_FragColor = texture;

  gl_FragColor.a *= circle(gl_PointCoord, 0.1);
}
