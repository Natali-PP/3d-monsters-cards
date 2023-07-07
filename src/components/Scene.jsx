import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Scroll, ScrollControls, useScroll, useTexture } from "@react-three/drei";
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

const ScrollingCards = ({ children, ...props }) => {
  const scrollRef = useRef();
  const data = useScroll();
  //console.log('aaaaa', scrollRef.current.children[0])
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

const Scene = () => {
  const [active, setActive] = useState(false);
  const [enableCamera, setEnableCamera] = useState(false);
  const cameraControlsRef = useRef();
  const scene = useThree((state) => state.scene);

  //console.log('camera ref', cameraControlsRef)
  //console.log('scene ref', scene)
  console.log('ACTIVE', active)



  useEffect(() => {
    if (active) {
      setEnableCamera(true)

      console.log('aaa', enableCamera)
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
      console.log('adentrooooo', cameraControlsRef.current)



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
      console.log('tttt', cameraControlsRef.current)

      //espero 1 segundo a que termine la animacion de la cámara
      setTimeout(() => {
        setEnableCamera(false)
      }, 600)
      console.log('aaa despues', enableCamera)
    }

  }, [active])

  return (
    <>

      <CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} enabled={enableCamera} />
      <Environment preset="sunset" />
      <ScrollControls damping={1} pages={3}  >
        <Scroll>
          <ScrollingCards>
            <CardWithModel
              //position-y=
              name="bat"
              active={active}
              setActive={setActive}
            >
              <BatWithBackground />
            </CardWithModel>
            <CardWithModel
              position={[0, -5, 0]}
              active={active}
              setActive={setActive}
              name='cthulu'>
              <CthuluWithBackground />
            </CardWithModel>
            <CardWithModel
              name='mushroom'

              position={[0, -10, 0]}
              active={active}
              setActive={setActive}
            >
              <MushroomWithBackground />
            </CardWithModel>
          </ScrollingCards>
        </Scroll>
      </ScrollControls>

    </>
  )
}

export default Scene;
