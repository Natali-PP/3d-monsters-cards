import { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const ScrollingCards = ({ children, ...props }) => {
  const scrollRef = useRef();
  const data = useScroll();
  useFrame(() => {
    scrollRef.current.children[0].position.z = 1 + data.range(0, 1 / 3) / 3
    scrollRef.current.children[1].position.z = 1 + data.range(0, 1 / 3) / 3
    scrollRef.current.children[2].position.z = 1 + data.range(1.15 / 3, 1 / 3) / 3
  })
  return (
    <group ref={scrollRef}>
      {children}
    </group>
  )
}

export default ScrollingCards;
