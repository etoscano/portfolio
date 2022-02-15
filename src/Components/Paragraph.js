import React from "react"
import { Dom } from "react-three-fiber"
import { useBlock } from "../blocks"
import state from "../Database"


function Paragraph({ image, index, factor, header, aspect, text }) {
    const { contentMaxWidth: w, canvasWidth, margin, mobile, viewportFactor } = useBlock()
    const size = aspect < 1 && !mobile ? 0.65 : 1
    const alignRight = (canvasWidth - w * size - margin) / 2
    const pixelWidth = canvasWidth * state.zoom * size
    const left = !(index % 2)
    const color = index % 2 ? "#D40749" : "#2FE8C3"

    return (
      <>
        <Dom style={{ width: pixelWidth , textAlign: left ? "left" : "right" }} position={[0,0,0]}>
            <div tabIndex={index}>{text}</div>
        </Dom>
      </>
    )
  }
  
  export { Paragraph }
  