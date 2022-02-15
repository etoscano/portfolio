import React, { forwardRef, useRef, useMemo } from "react"
import * as THREE from 'three'
import { TextureLoader, LinearFilter } from "three"
import { useFrame, useRender, useLoader } from "react-three-fiber"
import lerp from "lerp"
import { useBlock } from "../blocks"
import state from "../Database"
import "./BuildingsShaderMaterial.js"
import { Clock } from "three"
import { Vector3 } from "three"

const Buildings = forwardRef(({ color = "white", shift = 1, opacity = 1, args, ...props }, ref) => {
  const material = useRef()

  const buildings = useLoader(
    TextureLoader,
    state.buildings.map(({ image }) => image)
  )
  useMemo(() => buildings.forEach(texture => (texture.minFilter = LinearFilter)), [buildings])
  // useFrame(({ clock }) => {
  //   material.current.uniforms.uTime.value = clock.getElapsedTime() * 2;
  // })
  console.log(state.buildings)
  const num = 4
  const n = 13
  const radius = 3.5
 
  return (
    state.buildings.map((building, index) => (
      <mesh key={building.index} ref={ref} position={[
        Math.sin(Math.PI * 2 / n * index + Math.PI - Math.PI / n * (num - 1)) * radius,
        0.5,
        Math.cos(Math.PI * 2 / n * index + Math.PI - Math.PI / n * (num - 1)) * radius
        ]} >
        <planeBufferGeometry attach="geometry"  scale={[2, 2, 2]} />
        {/* <customMaterial ref={material} attach="material" color={color} map={map} transparent opacity={opacity} /> */}
        <buildingsShaderMaterial attach="material" transparent ref={material} map={buildings[index]} />
   
    </mesh>
    ))

    
  )
})





export { Buildings }



// export default class Sea
// {
//     constructor()
//     {
//         this.experience = new Experience()
//         this.time = this.experience.time
//         this.debug = this.experience.debug

//         // Debug
//         this.debugObject = {
//         }
//         // Colors
//         this.debugObject.depthColor = '#916118'
//         this.debugObject.surfaceColor = '#ffd79b'

//         if(this.debug.active)
//         {
//             this.debugFolder = this.debug.ui.addFolder('sea')
//             this.debugFolder.addColor(this.debugObject, 'depthColor').onChange(() => { this.material.uniforms.uDepthColor.value.set(this.debugObject.depthColor) })
//             this.debugFolder.addColor(this.debugObject, 'surfaceColor').onChange(() => { this.material.uniforms.uSurfaceColor.value.set(this.debugObject.surfaceColor) })

//         }

//         this.scene = this.experience.scene
//         this.resources = this.experience.resources

//         this.setGeometry()
//         // this.setTextures()
//         this.setMaterial()
//         this.setMesh()
//     }

//     setGeometry()
//     {
//         this.geometry = new THREE.PlaneGeometry(15, 15, 512, 512)
//     }

//     setMaterial()
//     {
//         // Material
//         this.material = new THREE.ShaderMaterial({
//             vertexShader: this.resources.items.waterVertexShader,
//             fragmentShader: this.resources.items.waterFragmentShader,
//             uniforms:
//             {
//                 uTime: { value: 0 },
                
//                 uBigWavesElevation: { value: 0.2 },
//                 uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
//                 uBigWavesSpeed: { value: 0.75 },

//                 uSmallWavesElevation: { value: 0.15 },
//                 uSmallWavesFrequency: { value: 3 },
//                 uSmallWavesSpeed: { value: 0.2 },
//                 uSmallIterations: { value: 4 },

//                 uDepthColor: { value: new THREE.Color(this.debugObject.depthColor) },
//                 uSurfaceColor: { value: new THREE.Color(this.debugObject.surfaceColor) },
//                 uColorOffset: { value: 0.08 },
//                 uColorMultiplier: { value: 5 }
//             }
//         })

//         if(this.debug.active)
//         {
//             this.debugFolder.add(this.material.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
//             this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
//             this.debugFolder.add(this.material.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
//             this.debugFolder.add(this.material.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')

//             this.debugFolder.add(this.material.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
//             this.debugFolder.add(this.material.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
//             this.debugFolder.add(this.material.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
//             this.debugFolder.add(this.material.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations')

//             this.debugFolder.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
//             this.debugFolder.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
//         }
//     }

//     setMesh()
//     {
//         this.mesh = new THREE.Mesh(this.geometry, this.material)
//         this.mesh.rotation.x = - Math.PI * 0.5
//         // this.mesh.receiveShadow = true
//         this.scene.add(this.mesh)
//     }


//     update(){
//         // Water
//         this.material.uniforms.uTime.value = this.time.elapsed * 0.001
//     }
// }