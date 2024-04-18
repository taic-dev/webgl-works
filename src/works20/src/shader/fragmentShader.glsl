varying vec2 vUv;
varying vec2 vTexCoords;

uniform float uPlaneAspect;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;
uniform sampler2D uTexture4;

uniform float uProgress1;
uniform float uProgress2;
uniform float uProgress3;
uniform float uProgress4;

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
  vec4 texture3 = texture2D(uTexture3, uv);
  vec4 texture4 = texture2D(uTexture4, uv);

  vec4 finalColor = (texture1 * uProgress1) + (texture2 * uProgress2) + (texture3 * uProgress3) + (texture4 * uProgress4);

  if(finalColor.r < 0.2 && finalColor.g < 0.2 && finalColor.b < 0.2){
    discard;
  };

  gl_FragColor = finalColor;

  gl_FragColor.a *= circle(gl_PointCoord, 0.1);
}
