import Image from 'next/image'
import styles from '../../styles/RotationIcon.module.css';
import { motion } from 'framer-motion';
import usePortalStore from "@/store/usePortalStore";


const RotationIcon = () => {

  const active = usePortalStore((state) => (state.active))
  const variants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: '-100%' },
  }
  return (
    <motion.div

      initial={{ opacity: 0, y: '-100%' }}
      animate={active ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 1 }}
    >
      <Image
        src="/360.png"
        width={50}
        height={50}
        className={styles.image}
        alt='rotate 360 degrees'
      />
    </motion.div>
  )
}

export default RotationIcon;
