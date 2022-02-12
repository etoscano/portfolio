import * as THREE from "three"
import { extend } from "react-three-fiber"

export class CloudsShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(vUv, 0.0, 1.0);
      }`
    })
  }
}

extend({ CloudsShaderMaterial })
