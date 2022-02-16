
import React, { Suspense, useEffect, useRef } from "react"
import { Canvas, Dom, useFrame } from "react-three-fiber"
import { Content } from "./Components/Content"
import { Startup } from "./Components/Startup"
import { Clouds } from "./Components/Clouds"
import { Buildings } from "./Components/Buildings"
import state from "./Database"
import * as THREE from 'three'
import Header from "./Components/Header/Header"
import { useMeasures } from "./Measures"

function Dolly() {
  const { fullHeight } = useMeasures()
  // This one makes the camera move
  useFrame(({ clock, camera }) => {
    // camera.position.x -= 0.0001
    // camera.position.z -= 0.001
    // camera.position.z -= (state.top.current * 1) * 0.0001
    camera.position.z -= Math.sin( Math.PI * 2 / fullHeight * state.top.current ) * 0.01
    // console.log(state.top.current)
  })
  return null
}


function App() {
  // TODO viewport aspect useblock
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  // const cam = useRef()
  camera.position.set(0, 0.5, 3)
  
  // const last = state.top.current
  // useFrame(() => {
  //   cam.current.position.y = lerp(camera.position.y, (state.top.current - last) / 100, 0.1)
  //   // console.log(lerp(camera.position.y, (state.top.current - last) / 100, 0.1))
  //   last = state.top.current
  // })
      

    // const color = "#FFD792"
    const color = "#000000"
    const scrollArea = useRef()
    const onScroll = e => (state.top.current = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])
    return (
      <>
        {/* <Canvas className="canvas" concurrent pixelRatio={1} camera={{ zoom: state.zoom, position: [0, 3, 500]}}> */}
        <Canvas className="canvas" concurrent pixelRatio={1} camera={camera} onCreated={state => state.gl.setClearColor(color)}>
          <Suspense fallback={
            <Dom center className="loading">
              <div className="loading__inner">Loading...</div>
            </Dom>
            }>

          <Clouds  args={[7,7, 512, 512]} rotation={[- Math.PI * 0.5, 0, 0]} position={[0, 0, -1]} frustumCulled={false} />
          <Buildings />
          
          <Dolly />

            <Content />
            
            <Startup />
          </Suspense>
        </Canvas>
        <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
          {new Array(state.sections).fill().map((_, index) => (
            <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
          ))}
        </div>
        <div className="frame">
          <Header />
        </div>
      </>
    )
  }

  export { App }