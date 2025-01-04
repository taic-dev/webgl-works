precision highp float;
uniform float uOffset;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uDisplacementTexture;

varying vec2 vUv;

const float displacementCoef = 0.5;

void main() {
	vec4 displacementTexture = texture2D(uDisplacementTexture, vUv);

	// texture1
	float displacementForce1 = displacementTexture.r * uOffset * displacementCoef;
	vec2 uvDisplaced1 = vec2(vUv.x + displacementForce1, vUv.y + displacementForce1); 
	vec4 displacedTexture1 = texture2D(uTexture1, uvDisplaced1);

	// texture2
	float displacementForce2 = displacementTexture.r * (1. - uOffset) * displacementCoef;
	vec2 uvDisplaced2 = vec2(vUv.x + displacementForce2, vUv.y + displacementForce2); 
	vec4 displacedTexture2 = texture2D(uTexture2, uvDisplaced2);

  gl_FragColor = (displacedTexture1 * (1. - uOffset) + displacedTexture2 * uOffset);
}
