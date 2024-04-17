varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 p = (vUv * 2.0 - 1.0);
  gl_FragColor = vec4(vec3(0.2078, 0.8627, 0.1216),1.0);
}
