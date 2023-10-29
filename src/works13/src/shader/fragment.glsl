precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform float effect1Number;
uniform float effect2Number;
uniform float effect3Number;

void main(void) {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution ) / min(resolution.x, resolution.y);
  vec2 v = vec2(0.0, 1.0);
  float u = sin((atan(p.y, p.x) - length(p * effect2Number) + time  ) * 20.0) * effect1Number;
  float t = effect3Number / abs(0.5 + u - length(p));
  gl_FragColor = vec4(vec3(t), 1.0);
}