import { CameraControls, Environment, Scroll, ScrollControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { Mushroom } from "./models/Mushroom";
import { Cthulhu } from "./models/Cthulu";
import { Bat } from "./models/Bat";
import ModelWithMapEnv from "./ModelWithMapEnv";
import CardPortal from "./CardPortal";
import ScrollingCards from "./ScrollingCards";
import { motion } from "framer-motion";
import TitleAndDescription from "./TitleAndDescription";

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
                texture='textures/fantasy_cthulhu_scary_cute.jpg'
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
        <Scroll html>
          <TitleAndDescription
            active={active}
            title="Drácula"
            description="Whats more scary than his immortal existence?
            His insatiable thirst for blood, his charisma, supernatural powers
            - a relentless predator, immortal and insatiable"
            styleTitle="draculaTitle"
            styleDescription="draculaDescription"
          />
          <TitleAndDescription
            active={active}
            title="Cthulhu"
            description="“That is not dead which can eternal lie,
            And with strange aeons even death may die”"
            styleTitle="cthulhuTitle"
            styleDescription="cthulhuDescription"
          />
          <TitleAndDescription
            active={active}
            title="Mushroom"
            description="An eerie environment where the line between beauty and danger becomes blurred,
            as if I had stepped into a realm where nature's secrets whispered of danger and the unknown."
            styleTitle="mushroomTitle"
            styleDescription="mushroomDescription"
          />
        </Scroll>
      </ScrollControls>
    </>
  )
}

export default Scene;
