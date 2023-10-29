precision mediump float;
uniform float time;
uniform vec2 resolution;
uniform float mouseX;
uniform float mouseY;

void main(void) {
  vec2 p = (gl_FragCoord.xy * 2.0 - resolution ) / min(resolution.x, resolution.y);
  vec2 v = vec2(0.0, 1.0);
  // float t = dot(p, v) / (length(p) * length(v));
  // float t = atan(p.y, p.x) + time;
  // t = sin(t * 10.0);
  float u = sin((atan(p.y, p.x) - length(p * 100.0) + time * 5.0 ) * 20.0) * 0.3;
  float t = 0.01 / abs(0.5 + u - length(p));
  gl_FragColor = vec4(vec3(t), 1.0);
}