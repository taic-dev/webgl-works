uniform vec2 uResolution;
uniform sampler2D uEffectImage;
uniform vec2 uMouse;
uniform float uTime;

varying vec2 vUv;

#pragma glslify: noise = require('glsl-noise/simplex/3d');

// オーロラ風のカラーパレット
vec3 auroraColor(float t) {
    // 基本となる青緑色
    vec3 a = vec3(0.1, 0.5, 0.5);
    // コントラスト
    vec3 b = vec3(0.5, 0.5, 0.5);
    // 周期
    vec3 c = vec3(1.0, 0.7, 0.4);
    // オフセット
    vec3 d = vec3(0.0, 0.15, 0.2);

    // より自然な色の変化のため、複数の正弦波を合成
    return a + b * cos(6.28318 * (c * t + d)) + 
           0.2 * sin(0.5 + t * 10.0);
}

// グロー効果を追加する関数
float glow(float pattern, float intensity) {
    return pow(pattern, intensity);
}

// 斜めラインを生成する関数
float diagonalLines(in vec2 pos, float b, float angle) {
    // 回転行列の作成
    float s = sin(angle);
    float c = cos(angle);
    mat2 rot = mat2(c, -s, s, c);
    
    // 座標を回転
    vec2 rotPos = rot * pos;
    
    // ノイズを追加してより自然な揺らぎを作成
    float noiseVal = noise(vec3(rotPos * 0.1, 0.2)) * 0.5;
    
    float scale = 5.0;
    rotPos += scale + noiseVal;
    
    // よりソフトな線を生成
    return smoothstep(0.0, 0.5 + b * 0.5, 
           abs((sin(rotPos.x * 3.1415) + b * 2.0)) * 0.5);
}

void main() {
    vec2 st = gl_FragCoord.xy/uResolution.xy;
    st.x *= uResolution.y/uResolution.x;

    vec2 pos = st.xy * vec2(10., 10.);
    
    // 複数の角度でラインを生成
    float angle1 = 3.14159 / -4.0 + sin(0.2) * 0.2;
    float angle2 = 3.14159 / -3.0 + cos( 0.3) * 0.2;
    
    // 複数のパターンを生成
    float pattern1 = diagonalLines(pos, 0.5, angle1);
    float pattern2 = diagonalLines(pos, 0.4, angle2);
    
    // パターンを組み合わせる
    float finalPattern = mix(pattern1, pattern2, 0.5);
    
    // グロー効果を追加
    float glowPattern = glow(finalPattern, 2.0);
    
    // 基本色の生成
    vec3 color1 = auroraColor(finalPattern + 0.1);
    vec3 color2 = auroraColor(finalPattern + 0.2 + 0.2);
    
    // 最終的な色を計算
    vec3 finalColor = mix(color1, color2, glowPattern);
    
    // 明るさを強調
    finalColor += vec3(glowPattern * 0.2);
    
    gl_FragColor = vec4(finalColor, 1.0);
}