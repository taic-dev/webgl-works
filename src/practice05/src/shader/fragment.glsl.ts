export default `uniform sampler2D udisplayment;
uniform vec2 uResolution;
uniform float uTime;
uniform float uCount;
varying vec2 vUv;

void main()
{

  vec4 color = texture2D(udisplayment, vUv);

  if (color.a < 0.05) {
	 	discard;
	}
  // 出力
  gl_FragColor = vec4(color);
}`