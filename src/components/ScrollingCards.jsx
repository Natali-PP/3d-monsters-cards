import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

const ScrollingCards = ({ children, ...props }) => {
  const scrollRef = useRef();
  const data = useScroll();
  const { viewport } = useThree()

  useFrame(() => {
    if (viewport.width > 2.8) {
      scrollRef.current.children[0].position.x = 1 + data.offset * 3
      scrollRef.current.children[1].position.x = -2 + data.offset * 3
      scrollRef.current.children[2].position.x = 2.5 - data.offset * 3
      scrollRef.current.children[3].position.x = -3.5 + data.offset * 3
      scrollRef.current.children[4].position.x = 4 - data.offset * 3
    }
  })

  return (
    <group ref={scrollRef}>
      {children}
    </group>
  )
}

export default ScrollingCards;
