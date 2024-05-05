varying vec2 vUv;
uniform float uTime;

void main () {
  gl_FragColor = vec4(0.8588, 0.8275, 0.6549, 1.0);
  gl_FragColor.r = sin(0. * 0.001);
  gl_FragColor.g = cos(0. * 0.01);
}