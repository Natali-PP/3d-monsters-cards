import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as easing from "maath/easing";
import { Environment, MeshPortalMaterial, RoundedBox } from "@react-three/drei";
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
  const mouseTolerance = 0.2;

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

  const centerX = window.innerWidth * 0.5;
  const centerY = window.innerHeight * 0.5;

  useFrame((_state, delta) => {
    const isWorldOpen = active === name;
    easing.damp(portalMaterial.current, 'blend', isWorldOpen ? 1 : 0, 0.15, delta);

    if (!active) {
      roundedBoxRef.current.rotation.x = (mouseCoords.y - centerY) / centerY * mouseTolerance;
      roundedBoxRef.current.rotation.y = (mouseCoords.x - centerX) / centerX * mouseTolerance;
    }
  })

  return (
    <group {...props}

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
          <Environment preset="sunset" />
          {children}
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  )
}

export default CardPortal;
