import { motion } from "framer-motion"
import styles from '../styles/TitleAndDescription.module.css'
import { useRef } from "react"
import usePortalStore from "@/store/usePortalStore";

const TitleAndDescription = ({ title, description, styleTitle, styleDescription }) => {
  const ref = useRef();
  const [active, setActive] = usePortalStore(
    (state) => [state.active, state.setActive]
  )
  const variantsH1 = {
    insidePortal: {
      color: '#000000',
      textShadow: '3px 3px 2px #927856',
      y: "-4vw",
    },
    outsidePortal: {
      color: '#b9b18e',
      textShadow: '#927856 2px 5px',
      y: "4vw",
    }
  }

  const variantsP = {
    insidePortal: {
      color: '#000000',
      textShadow: '2px 2px 5px #927856',
      y: "-4vw",
    },
    outsidePortal: {
      color: '#b9b18e',
      textShadow: '1px 1px 2px #927856',
      y: "4vw",
    }
  }
  return (
    <>
      <motion.h1
        animate={active ? "insidePortal" : "outsidePortal"}
        variants={variantsH1}
        transition={{ duration: 1.25 }}
        className={`${styles.title} ${styles[styleTitle]}`}
        ref={ref}
      >
        {title}
      </motion.h1>
      <motion.p
        animate={active ? "insidePortal" : "outsidePortal"}
        variants={variantsP}
        transition={{ duration: 1.25 }}
        className={`${styles.description} ${styles[styleDescription]}`}
      >
        {description}
      </motion.p>
    </>
  )
}

export default TitleAndDescription;
