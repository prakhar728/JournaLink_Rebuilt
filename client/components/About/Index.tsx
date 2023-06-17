import React from 'react'
import styles from "./About.module.css";
import Image from 'next/image';
import phone from "../../assets/LogoPhone.png";
import Gradient from "../../assets/Gradient.svg"
const Index = () => {
    return (
        <div className={styles.aboutWrapper}>
            
            <p className={styles.aboutHeading}>About Us</p>
            <div className={styles.mainAbout}>
                <div className={styles.left}>
                    <Image src={Gradient} alt="Logo on phone" />
                </div>
                <div className={styles.right}>
                    <div className={styles.rightContent}>
                        <p className={styles.contentHeading}>
                        At JournaLink, we are reimagining the landscape of journalism.
                        </p>
                        <p className={styles.contentDescription}>
                        Join us to revolutionize news consumption and creation. Contribute data, publish content, and engage with a vibrant community. Together, let's shape the future of journalism.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index