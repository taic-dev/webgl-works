uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;
varying vec3 vPosition;

float lines(vec2 uv) {
  return abs(sin(uv.x * 10.));
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

void main() {
  // vec2 st = gl_FragCoord.xy/uResolution;
  // vec2 uv = vPosition.xy;
  // float baseLines = lines(uv);
  // gl_FragColor = vec4(vec3(baseLines), 1.0);

  vec2 uv = vPosition.xy;
  float baseLines = lines(uv);
  gl_FragColor = vec4(vec2(uv), uv.x, 1.0);
}