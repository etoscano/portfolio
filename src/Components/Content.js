
import React, { useMemo } from "react"
import { Dom, useLoader } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"
import { Text, MultilineText } from "./Text"
import { Paragraph } from "./Paragraph"
import { Block, useBlock } from "../blocks"
import state from "../Database"

function Content() {
    const images = useLoader(
      TextureLoader,
      state.paragraphs.map(({ image }) => image)
    )
    useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
    const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
    return (
      <>
        {/* <Block factor={1} offset={0}>
          <Block factor={1.2}>
            <Text left size={w * 0.08} position={[-w / 3.2, 0.5, -1]} color="#d40749">
              MOKSHA
            </Text>
          </Block>
          <Block factor={1.0}>
            <Dom position={[-w / 3.2, -w * 0.8 + 0.25, -1]}>It was the year 2076.{mobile ? <br /> : " "}The substance had arrived.</Dom>
          </Block>
        </Block>
        <Block factor={1.2} offset={5.7}>
          <MultilineText top left size={w * 15} lineHeight={w / 5} position={[-w / 3.5, 0, -1]} color="#2fe8c3" text={"four\nzero\nzero"} />
        </Block> */}
        {state.paragraphs.map((props, index) => (
          <Paragraph key={index} index={index} {...props} image={images[index]} />
        ))}
        {/* {state.stripes.map(({ offset, color, height }, index) => (
          <Block key={index} factor={-1.5} offset={offset}>
            <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -10]} />
          </Block>
        ))} */}
        {/* <Block factor={1.25} offset={8}>
          <Dom className="bottom-left" position={[-canvasWidth / 2, -canvasHeight / 2, 0]}>
            Culture is not your friend.
          </Dom>
        </Block> */}
      </>
    )
  }

  export { Content }