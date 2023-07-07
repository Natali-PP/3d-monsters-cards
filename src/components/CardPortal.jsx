import { useRef } from "react";
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
  const portalMaterial = useRef();
  useFrame((_state, delta) => {
    const isWorldOpen = active === name;
    easing.damp(portalMaterial.current, 'blend', isWorldOpen ? 1 : 0, 0.15, delta)
  })
  return (
    <group {...props} >
      <RoundedBox args={[2, 3, 0.2]} radius={0.2} onDoubleClick={() => setActive(active === name ? null : name)} name={name}>
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
