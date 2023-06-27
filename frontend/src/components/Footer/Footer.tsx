import React from 'react'
import styles from "./Footer.module.css";
import Image from 'next/image';
import shape from "../../assets/Shape.png";
const Footer = () => {
  return (
    <div className={styles.FooterWrapper}>
        <div className={styles.shapeWrapper}>

        <Image src={shape} alt="Footer shape" />
        </div>
        <div className={styles.content}>
            Random Bullshit
        </div>
    </div>
  )
}

export default Footer