import React, { forwardRef, useRef } from "react"
import { useFrame } from "react-three-fiber"
import "./CloudsShaderMaterial.js"

const Clouds = forwardRef(({ color = "white", shift = 1, opacity = 1, args, map, ...props }, ref) => {
  const material = useRef()
  useFrame(({ clock }) => {
    material.current.uniforms.uTime.value = clock.getElapsedTime() * 2;
  })
  return (
    <mesh ref={ref} {...props}>
      <planeBufferGeometry attach="geometry" args={args} />
      <cloudsShaderMaterial attach="material" ref={material} />
    </mesh>
  )
})

export { Clouds }
