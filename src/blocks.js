import React, { createContext, useRef, useContext } from "react"
import { useFrame, useThree } from "react-three-fiber"
import lerp from "lerp"
import state from "./Database"

const indexContext = createContext(0)

function Block({ children, index, factor, ...props }) {
  const { index: parentIndex, sectionHeight, viewportFactor } = useBlock()
  const ref = useRef()
  index = index !== undefined ? index : parentIndex


console.log("sectionHeight " + -sectionHeight)
console.log( index )
console.log( factor)
console.log(-sectionHeight * index * factor)

  useFrame(() => {
    const curY = ref.current.position.y
    const curTop = state.top.current
    // const h = (state.pages / state.sections) * 100 * 0.8
    ref.current.position.y = lerp(curY, (curTop / state.zoom) * viewportFactor, 0.1)
  })
  return (
    <indexContext.Provider value={index}>
      <group {...props} position={[0, -sectionHeight * index * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </indexContext.Provider>
  )
}

function useBlock() {
  const { sections, pages, zoom } = state
  const { size, viewport } = useThree()
  const index = useContext(indexContext)
  const viewportWidth = viewport.width * viewport.factor
  const viewportHeight = viewport.height * viewport.factor
  const viewportFactor = viewport.factor
  const canvasWidth = viewportWidth / zoom
  const canvasHeight = viewportHeight / zoom
  const mobile = size.width < 700
  const margin = canvasWidth * (mobile ? 0.2 : 0.1)
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6)
  const sectionHeight = viewportHeight * ((pages - 1) / (sections - 1))
  console.log(viewportWidth + " viewportWidth")
  console.log(viewportHeight + " viewportHeight")
  console.log(sectionHeight + " sectionHeight")
  const indexFactor = (index + 1.0) / sections
  return {
    viewport,
    index,
    viewportWidth,
    viewportHeight,
    viewportFactor,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight,
    indexFactor
  }
}

export { Block, useBlock }
