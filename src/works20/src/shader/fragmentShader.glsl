varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uR;
uniform float uG;
uniform float uB;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
  float gray = length(uv) * 0.5;
  gl_FragColor = vec4(vec3(gray), 1.0);
}
