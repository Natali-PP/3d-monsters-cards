import { useTexture } from "@react-three/drei";
import * as THREE from 'three';

const ModelWithMapEnv = ({ children, texture, ...props }) => {
  const map = useTexture(texture);
  return (
    <>
      {children}
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>

  )
}

export default ModelWithMapEnv;
