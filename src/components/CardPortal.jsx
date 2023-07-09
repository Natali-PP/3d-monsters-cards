import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import { Environment, MeshPortalMaterial, RoundedBox, Sparkles, Trail } from "@react-three/drei";
import * as THREE from 'three';
import { motion } from "framer-motion-3d"
const CardPortal = ({
  children,
  name,
  active,
  setActive,
  ...props
}) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })
  const portalMaterial = useRef();
  const roundedBoxRef = useRef();
  const mouseTolerance = 0.5;
  const centerX = window.innerWidth * 0.5;
  const centerY = window.innerHeight * 0.5;

  useEffect(() => {
    const handleWindowMouseMove = event => {
      setMouseCoords({
        x: event.clientX,
        y: event.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
      );
    };
  }, []);

  useFrame((_state, delta) => {
    const isWorldOpen = active === name;
    easing.damp(portalMaterial.current, 'blend', isWorldOpen ? 1 : 0, 0.15, delta);


    if (!active) {
      easing.dampE(roundedBoxRef.current.rotation, [
        (mouseCoords.y - centerY) / centerY * mouseTolerance,
        (mouseCoords.x - centerX) / centerX * mouseTolerance,
        0
      ], 0.25, delta)
    }
  })

  return (
    <motion.group {...props}
      initial="hidden"
      animate="visible"
      viewport={{ once: false }}
      transition={{ duration: 2.3 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 }
      }}
    >
      <RoundedBox
        args={[2, 3, 0.2]}
        radius={0.2}
        onDoubleClick={() => setActive(active === name ? null : name)}
        name={name}
        ref={roundedBoxRef}
        onPointerMove={({ clientX, clientY }) => {
          setMouseCoords({
            x: clientX,
            y: clientY
          })
        }}

      >
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
          <ambientLight intensity={2.5} />
          {children}
        </MeshPortalMaterial>
      </RoundedBox>

      <Sparkles count={80} scale={2} speed={0.4} size={5} />
    </motion.group>
  )
}

export default CardPortal;
