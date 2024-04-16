varying vec2 vUv;
uniform float uPlaneAspect;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float progress;
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

  vec4 white = vec4(1.0, 1.0, 1.0, 1.0);

  vec4 texture1 = texture2D(uTexture1, uv);
  vec4 texture2 = texture2D(uTexture2, uv);

  vec4 final = mix(texture1, texture2, smoothstep(0., 1., fract(progress)));

  gl_FragColor = final;

  gl_FragColor.a *= circle(gl_PointCoord, 0.1);
}
