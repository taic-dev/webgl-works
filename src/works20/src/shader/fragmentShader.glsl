varying vec2 vUv;
uniform float uPlaneAspect;
uniform float uR;
uniform float uG;
uniform float uB;

void main() {
  gl_FragColor = vec4(uR, uG, uB, 1.0);
}