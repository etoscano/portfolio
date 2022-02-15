import React, { forwardRef, useRef, useMemo } from "react"
import { TextureLoader, LinearFilter } from "three"
import { useLoader } from "react-three-fiber"
import state from "../Database"
import "./BuildingsShaderMaterial.js"

const Buildings = forwardRef(({ color = "white", shift = 1, opacity = 1, args, ...props }, ref) => {
  const material = useRef()

  const buildings = useLoader(
    TextureLoader,
    state.buildings.map(({ image }) => image)
  )
  useMemo(() => buildings.forEach(texture => (texture.minFilter = LinearFilter)), [buildings])
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
          <buildingsShaderMaterial attach="material" transparent ref={material} map={buildings[index]} />
    </mesh>
    ))

    
  )
})

export { Buildings }
