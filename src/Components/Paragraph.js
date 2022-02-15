import React from "react"
import { Dom } from "react-three-fiber"
import { useMeasures } from "../Measures"
import state from "../Database"


function Paragraph({ image, index, factor, header, aspect, text }) {
    const { canvasWidth, mobile } = useMeasures()
    const size = aspect < 1 && !mobile ? 0.65 : 1
    const pixelWidth = canvasWidth * state.zoom * size
    const left = !(index % 2)

    return (
      <>
        <Dom style={{ width: pixelWidth , textAlign: left ? "left" : "right" }} position={[0,0,0]}>
            <div tabIndex={index}>{text}</div>
        </Dom>
      </>
    )
  }
  
  export { Paragraph }
  