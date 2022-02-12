
import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber"
import { Content } from "./Components/Content"
import { Startup } from "./Components/Startup"
import { Clouds } from "./Components/Clouds"
import Diamonds from "./diamonds/Diamonds"
import state from "./Database"

import Header from "./Components/Header/Header"

function App() {
    const scrollArea = useRef()
    const onScroll = e => (state.top.current = e.target.scrollTop)
    useEffect(() => void onScroll({ target: scrollArea.current }), [])
    return (
      <>
        <Canvas className="canvas" concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
          <Suspense fallback={<Dom center className="loading" children="Loading..." />}>

          <Clouds  args={[15, 15, 512, 512]} frustumCulled={false} />
 

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