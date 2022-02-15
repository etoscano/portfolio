
import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber"
import { Content } from "./Components/Content"
import { Startup } from "./Components/Startup"
import { Clouds } from "./Components/Clouds"
import Diamonds from "./diamonds/Diamonds"
import { Buildings } from "./Components/Buildings"
import state from "./Database"
import * as THREE from 'three'
import Header from "./Components/Header/Header"


function App() {
  // TODO viewport aspect useblock
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
  camera.position.set(0, 0.5, 3)

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

          <Clouds  args={[7,7, 512, 512]} rotation={[- Math.PI * 0.5, 0, 0]} frustumCulled={false} />
          <Buildings />

            <Content />
            <Diamonds />
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