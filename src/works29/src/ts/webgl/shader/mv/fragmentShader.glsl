uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;
uniform float uColor1;
uniform float uColor2;
uniform float uColor3;

varying vec2 vUv;
varying vec3 vPosition;

float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

float lines(vec2 uv, float offset) {
  return smoothstep(
    0., 0.5 + offset*0.5, abs(0.5 * sin(uv.x * 5.) + offset * 0.4)
  );
}

mat2 rotate2d(float _angle){
  return mat2(cos(_angle),-sin(_angle),sin(_angle),cos(_angle));
}

vec3 palette(float t) {
  vec3 a = vec3(0.5098, 0.5373, 0.4941);
  vec3 b = vec3(0.5137, 0.5373, 0.498);
  vec3 c = vec3(0.3725, 0.3725, 0.0);
  vec3 d = vec3(uColor1, uColor2, uColor3);

  return a+b*cos(6.28318*(c*t+d));
}

void main() {
  float n = noise(vPosition + uTime);
  vec2 uv = rotate2d(n) * vPosition.xy;
  float baseLines = lines(uv, 0.5);
  gl_FragColor = vec4(palette(baseLines), 1.0);

  // vec2 uv = vPosition.xy;
  // float baseLines = lines(uv);
  // gl_FragColor = vec4(vec2(uv), uv.x, 1.0);
}