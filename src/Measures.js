import { createContext, useContext } from "react"
import { useThree } from "react-three-fiber"
import state from "./Database"

const indexContext = createContext(0)


function useMeasures() {
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
  const contentMaxWidth = canvasWidth 
  const sectionHeight = viewportHeight * ((pages - 1) / (sections - 1))
  const indexFactor = (index + 1.0) / sections
  const fullHeight = sectionHeight * sections
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
    indexFactor,
    fullHeight
  }
}

export { useMeasures }
