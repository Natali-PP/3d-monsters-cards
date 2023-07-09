import { motion } from "framer-motion"
import styles from '../styles/TitleAndDescription.module.css'

const TitleAndDescription = ({ active, title, description, styleTitle, styleDescription }) => {
  return (
    <>
      <motion.h1
        animate={{ color: active ? 'black' : 'white', textShadow: active ? '#b7eaf3  2px 5px' : '#cb91c1 2px 5px' }}
        transition={{ duration: 1.5 }}
        className={`${styles.title} ${styles[styleTitle]}`}
      >
        {title}
      </motion.h1>
      <motion.p
        animate={{ color: active ? 'black' : 'white', textShadow: active ? '#b7eaf3 1px 0 10px' : '#cb91c1 2px 2px 3px' }}
        transition={{ duration: 1.5 }}
        className={`${styles.description} ${styles[styleDescription]}`}
      >

        {description}
      </motion.p>
    </>
  )
}

export default TitleAndDescription;
