import { CameraControls, Environment, Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Mushroom } from "./models/Mushroom";
import { Cthulhu } from "./models/Cthulu";
import { Bat } from "./models/Bat";
import { Alien } from "./models/Alien"
import ModelWithMapEnv from "./ModelWithMapEnv";
import CardPortal from "./CardPortal";
import ScrollingCards from "./ScrollingCards";
import { Demon } from "./models/Demon";
import usePortalStore from "@/store/usePortalStore";
import TitleandDescriptionContainer from "./TitleAndDescriptionContainer";

const Scene = () => {
  const [enableCamera, setEnableCamera] = useState(false);
  const cameraControlsRef = useRef();
  const scene = useThree((state) => state.scene);
  const [active, setActive] = usePortalStore(
    (state) => [state.active, state.setActive]
  )
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
      <CameraControls ref={cameraControlsRef} enabled={enableCamera} />
      <Environment preset="sunset" />
      <ScrollControls damping={0.65} pages={6} >
        <Scroll>
          <ScrollingCards>
            <CardPortal name="demon">
              <ModelWithMapEnv texture='textures/demon.jpg'>
                <Demon scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal position={[0, -5, 0]} name='cthulu'>
              <ModelWithMapEnv texture='textures/cthulhu.jpg'>
                <Cthulhu scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal name='alien' position={[0, -10, 0]}>
              <ModelWithMapEnv texture='textures/alien.jpg'>
                <Alien scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal name='mushroom' position={[0, -15, 0]}>
              <ModelWithMapEnv texture='textures/mushroom2.jpg'>
                <Mushroom scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal name='bat' position={[0, -20, 0]}>
              <ModelWithMapEnv texture='textures/dracula.jpg'>
                <Bat scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>
          </ScrollingCards>
        </Scroll>
        <Scroll html>
          <TitleandDescriptionContainer />
        </Scroll>
      </ScrollControls>
    </>
  )
}

export default Scene;
