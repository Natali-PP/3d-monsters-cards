import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, Scroll, ScrollControls, useScroll, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Mushroom } from "./models/Mushroom";
import { Cthulhu } from "./models/Cthulu";
import { Bat } from "./models/Bat";
import ModelWithMapEnv from "./ModelWithMapEnv";
import CardPortal from "./CardPortal";
import ScrollingCards from "./ScrollingCards";
//const ScrollingCards = ({ children, ...props }) => {
//  const scrollRef = useRef();
//  const data = useScroll();
//  useFrame(() => {
//    scrollRef.current.children[0].position.z = 1 + data.range(0, 1 / 3) / 3
//    scrollRef.current.children[0].position.x = 1 + data.range(0, 1 / 3) / 3
//    scrollRef.current.children[1].position.z = 1 + data.range(0, 1 / 3) / 3
//    scrollRef.current.children[2].position.z = 1 + data.range(1.15 / 3, 1 / 3) / 3
//  })
//  return (
//    <group ref={scrollRef}>
//      {children}
//    </group>
//  )
//}

const Scene = () => {
  const [active, setActive] = useState(false);
  const [enableCamera, setEnableCamera] = useState(false);
  const cameraControlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useEffect(() => {
    if (active) {
      setEnableCamera(true)
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
      //espero 600ms a que termine la animacion de la cámara
      setTimeout(() => {
        setEnableCamera(false)
      }, 600)
    }
  }, [active])

  return (
    <>
      <CameraControls ref={cameraControlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} enabled={enableCamera} />
      <Environment preset="sunset" />
      <ScrollControls damping={1} pages={3}  >
        <Scroll>
          <ScrollingCards>
            <CardPortal
              name="bat"
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/holographic_transilvania_vampire_house_with_bats.jpg'
              >
                <Bat scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal
              position={[0, -5, 0]}
              active={active}
              setActive={setActive}
              name='cthulu'>
              <ModelWithMapEnv
                texture='textures/surreal_cthulhu.jpg'
              >
                <Cthulhu scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal
              name='mushroom'
              position={[0, -10, 0]}
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/surreal_deep_forest.jpg'
              >
                <Mushroom scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>
          </ScrollingCards>
        </Scroll>
      </ScrollControls>
    </>
  )
}

export default Scene;
