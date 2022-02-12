
uniform sampler2D uTexture;
uniform sampler2D uMask;

varying vec2 vUv;

void main()
{
    vec4 t = texture2D(uTexture, vUv);
    float alpha = step(0.5, texture2D(uMask, vUv).r);
    t *= alpha;
    gl_FragColor = t;
}