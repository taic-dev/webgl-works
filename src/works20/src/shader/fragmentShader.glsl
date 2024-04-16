varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uR;
uniform float uG;
uniform float uB;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = (gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y);
  
  float ring = 0.02 / abs(0. - length(uv));

  gl_FragColor = vec4(vec3(ring), 1.0);
}
