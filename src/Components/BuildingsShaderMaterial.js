import * as THREE from "three"
import { extend } from "react-three-fiber"

export class BuildingsShaderMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        // uTexture: {value: this.resources.items['b_' + i]}
        uTexture: {value: 'b_1.jpeg'}
      },
      vertexShader: `
      varying vec2 vUv;

      void main()
      {   
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
      
          gl_Position = projectedPosition;
      
          vUv = uv;
      }
      `,
      fragmentShader: `
      uniform sampler2D uTexture;

      varying vec2 vUv;
      
      void main()
      {
          vec4 t = texture2D(uTexture, vUv);
          gl_FragColor = t;
      }
      `
    })
  }

  set map(value) {
    this.uniforms.uTexture.value = value
  }

  get map() {
    return this.uniforms.uTexture.value
  }
}



extend({ BuildingsShaderMaterial })
