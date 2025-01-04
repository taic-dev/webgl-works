/*vertex.glsl*/
export default `uniform float uPixelRation;
uniform float uSize;
uniform float uTime;
uniform float uInfluence;
uniform float uStep;
varying vec2 vUv;
varying float vPointSize;

float random (vec2 st) {
    return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}
float animation(float f){
  float speed = 1.0;
  return sin(f * 6.283 + uTime * speed) * 0.5 + 0.5;
}
float whitenoise(vec2 uv){
  float w = animation(random(uv));
  return w;
}

void main() {
  vUv = uv;

  // ★White noise
  float pp = whitenoise( vec2( position.x, position.y ));
  vec3 p = vec3( position.x, position.y, position.z + pp* 10.0 );
  vec4 worldPosition = modelMatrix * vec4( position * (1.0 - uStep ) + p * uStep , 1.0 );

  vec4 mvPosition =  viewMatrix * worldPosition;
  gl_Position = projectionMatrix * mvPosition;

  // camera position to size point
  vec3 cameraPos = cameraPosition.xyz; // カメラの位置を取得
  float dist = length(position - cameraPos);
  vPointSize = uSize * uPixelRation * 1000.0 / dist;

  gl_PointSize = vPointSize;
}`