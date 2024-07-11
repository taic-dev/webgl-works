uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(uTexture, vUv);

  // if(color.r > 0. && color.g > 0. && color.b > 0.){
  //   discard;
  // };

  // color.a = 0.3;

  gl_FragColor = color;
}