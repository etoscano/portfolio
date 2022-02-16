import React, { forwardRef, useRef } from "react"
import { TextureLoader } from "three"
import { useLoader, useThree } from "react-three-fiber"
import state from "../Database"
import "./BuildingsShaderMaterial.js"

const Buildings = forwardRef(({ color = "white", shift = 1, opacity = 1, args, ...props }, ref) => {
  const material = useRef()

  const { gl } = useThree()
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const buildings = useLoader(
    TextureLoader,
    state.buildings.map(({ image }) => image)
  )

  const num = 9
  const n = 27
  const radius = 3.5
 
  return (
    state.buildings.map((building, index) => (
      <mesh key={building.index} scale={[1, 1, 1]} ref={ref} position={[
          Math.sin(Math.PI * 2 / n * index + Math.PI - Math.PI / n * (num - 1)) * (radius + (index % 2) * 0.5),
          0.5,
          Math.cos(Math.PI * 2 / n * index + Math.PI - Math.PI / n * (num - 1)) * (radius + (index % 2) * 0.5)
        ]} >
          <planeBufferGeometry attach="geometry" />
          <buildingsShaderMaterial attach="material" transparent ref={material} map={buildings[index]} />
    </mesh>
    ))

    
  )
})

export { Buildings }
