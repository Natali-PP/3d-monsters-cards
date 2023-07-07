import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

import * as THREE from 'three';
import { Mushroom } from "./models/Mushroom";
import { Cthulhu } from "./models/Cthulu";
import { Bat } from "./models/Bat";
import * as easing from "maath/easing";

const MushroomWithBackground = () => {
  const map = useTexture('textures/surreal_deep_forest.jpg')
  return (
    <>
      <Mushroom scale={0.5} position={[0, -0.4, 0]} />
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>

  )
}

const BatWithBackground = () => {
  const map = useTexture('textures/holographic_transilvania_vampire_house_with_bats.jpg')
  return (
    <>
      <Bat scale={0.5} position={[0, -0.4, 0]} />
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>

  )
}


const CthuluWithBackground = () => {
  const map = useTexture('textures/surreal_cthulhu.jpg')
  return (
    <>
      <Cthulhu scale={0.5} position={[0, -0.4, 0]} />
      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>

  )
}

const CardWithModel = ({
  children,
  name,
  active,
  setActive,
  ...props
}) => {

  const portalMaterial = useRef();
  //console.log(portalMaterial.current)

  console.log('name', name, 'active', active, active === name)
  useFrame((_state, delta) => {
    const isWorldOpen = active === name;

    easing.damp(portalMaterial.current, 'blend', isWorldOpen ? 1 : 0, 0.15, delta)
  })

  return (
    <group {...props}>
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

const Scene = () => {
  const [active, setActive] = useState(false);
  const cameraControlsRef = useRef();
  const scene = useThree((state) => state.scene);

  console.log('camera ref', cameraControlsRef)
  console.log('scene ref', scene)



  useEffect(() => {
    if (active) {

      const targetPositionInBackground = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPositionInBackground);
      cameraControlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPositionInBackground.x,
        targetPositionInBackground.y,
        targetPositionInBackground.z,
        true
      )


    } else {
      cameraControlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true
      )
    }
  }, [active])
  return (
    <>
      <CameraControls ref={cameraControlsRef} />

      <Environment preset="sunset" />
      <CardWithModel
        position-y={4}
        name="bat"
        active={active}
        setActive={setActive}
      >
        <BatWithBackground />
      </CardWithModel>
      <CardWithModel
        active={active}
        setActive={setActive}
        name='cthulu'>
        <CthuluWithBackground />
      </CardWithModel>
      <CardWithModel
        name='mushroom'

        position={[2, -4, -4]}
        active={active}
        setActive={setActive}
      >
        <MushroomWithBackground />
      </CardWithModel>

    </>
  )
}

export default Scene;
