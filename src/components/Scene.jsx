import { CameraControls, Environment, Html, Scroll, ScrollControls } from "@react-three/drei";
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
import { color, motion } from "framer-motion";
import TitleAndDescription from "./TitleAndDescription";
import styles from '../styles/Scene.module.css';
import { Demon } from "./models/Demon";

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
      <CameraControls ref={cameraControlsRef}
        enabled={enableCamera} />
      <Environment preset="sunset" />
      <ScrollControls damping={0.5} pages={6} >
        <Scroll>
          <ScrollingCards>
            <CardPortal
              name="demon"
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/demon.jpg'
              >
                <Demon scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal
              position={[0, -5, 0]}
              active={active}
              setActive={setActive}
              name='cthulu'>
              <ModelWithMapEnv
                texture='textures/cthulhu.jpg'
              >
                <Cthulhu scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>

            <CardPortal
              name='alien'
              position={[0, -10, 0]}
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/alien.jpg'
              >
                <Alien scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>
            <CardPortal
              name='mushroom'
              position={[0, -15, 0]}
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/mushroom2.jpg'
              >
                <Mushroom scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>
            <CardPortal
              name='bat'
              position={[0, -20, 0]}
              active={active}
              setActive={setActive}
            >
              <ModelWithMapEnv
                texture='textures/dracula.jpg'
              >
                <Bat scale={0.5} position={[0, -0.4, 0]} />
              </ModelWithMapEnv>
            </CardPortal>
          </ScrollingCards>
        </Scroll>
        <Scroll html>
          <TitleAndDescription
            active={active}
            title="Demon"
            description="Tap into our deepest fears and religious beliefs. What's evil, torment or eternal damnation? 
            This realm evokes a fear of punishment, spiritual darkness, and the possibility of losing one's soul. 
            Face the uncertainty of what lies beyond death and the dread of facing the consequences of our actions in the afterlife."
            styleTitle="firstTitle"
            styleDescription="firstDescription"
          />
          <TitleAndDescription
            active={active}
            title="Cthulhu"
            description="“That is not dead which can eternal lie,
            And with strange aeons even death may die”"
            styleTitle="secondTitle"
            styleDescription="secondDescription"
          />
          <TitleAndDescription
            active={active}
            title="Alien"
            description="It's unfamiliar appearance and advanced capabilities challenge our understanding of the universe, 
            triggering feelings of vulnerability and insignificance. Get to know their intentions, the potential for invasion 
            or abduction, and the unsettling realization that we may not be alone in the vastness of space"
            styleTitle="thirdTitle"
            styleDescription="thirdDescription"
          />
          <TitleAndDescription
            active={active}
            title="Mushroom"
            description="An eerie environment where the line between beauty and danger becomes blurred,
            as if you had stepped into a realm where nature's secrets whispered of danger and the unknown."
            styleTitle="fourthTitle"
            styleDescription="fourthDescription"
          />
          <TitleAndDescription
            active={active}
            title="Drácula"
            description="Whats more scary than his immortal existence?
            His insatiable thirst for blood, his charisma, supernatural powers
            - a relentless predator, immortal and insatiable"
            styleTitle="fifthTitle"
            styleDescription="fifthDescription"
          />
        </Scroll>
      </ScrollControls>
    </>
  )
}

export default Scene;
