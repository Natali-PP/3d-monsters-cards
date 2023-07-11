import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import { MeshPortalMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import * as THREE from 'three';

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
    easing.damp(
      portalMaterial.current,
      'blend',
      isWorldOpen ? 1 : 0,
      0.15,
      delta
    );

    if (!active) {
      easing.dampE(
        roundedBoxRef.current.rotation,
        [
          (mouseCoords.y - centerY) / centerY * mouseTolerance,
          (mouseCoords.x - centerX) / centerX * mouseTolerance,
          0
        ],
        0.25,
        delta
      )
    }
  })

  return (
    <group {...props} >
      <RoundedBox
        args={[2, 3, 0.3]}
        radius={0.3}
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

      <Sparkles count={80} scale={2} speed={0.4} size={5} color={'red'} noise={5} />
    </group>
  )
}

export default CardPortal;
