import React from 'react'
import styles from "./Sponsor.module.css";
import huddle from "../../assets/Huddle1.png";
import lighthouse from "../../assets/Lighthouse1.png";
import ens from "../../assets/ENS.png";
import fvm from "../../assets/Filecoin.png";
import tableland from "../../assets/Tableland.png";
import Image from 'next/image';
const Index = () => {
  return (
    <div className={styles.sponsorWrapper}>
        <div className={styles.heading}>
            <p>Our Sponsors</p>
        </div>
        <div className={
            styles.sponsorList
        }>
            <div className={styles.upper}>
                <div className={styles.type1}>
                    <Image src={huddle} alt="Huddle01" />
                </div>
                <div className={styles.type2}>
                <Image src={fvm} alt="Huddle01" />

                </div>
                <div className={styles.type1}>
                <Image src={lighthouse} alt="Huddle01" />

                </div>
            </div>
            <div className={styles.lower}>
                <div className={styles.type3}>
                <Image src={ens} alt="Huddle01" />

                </div>
                <div className={styles.type3}>
                <Image src={tableland} alt="Huddle01" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index