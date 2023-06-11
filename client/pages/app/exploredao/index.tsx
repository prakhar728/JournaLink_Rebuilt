import React from 'react'
import styles from "../../../styles/pages/ExploreDao.module.css"
import Navbar from '../../../components/Navbar'
import Link from 'next/link';
import logoDao from "../../../assets/DaoDemo.png";
import Image from 'next/image';
const index = () => {
  return (
    <div>
        <Navbar />
        <div className={styles.daoWrapper}>
            <div className={styles.nav}>
                <Link href="/app/explore"> &lt; Go Back </Link>
                <h2>12 Prompts Till Now</h2>
            </div>
            <div className={styles.main}>
                <div className={styles.left}>
                    <Image src={logoDao} alt="Logo of dao" />
                    <h2>BBC NEWS</h2>
                    <p><span>520</span> Members Joined</p>
                    <p><span>10 </span> FIL Rewarded</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora natus consectetur officia aspernatur, odio ea! Dolore doloremque laboriosam assumenda earum pariatur voluptates cumque expedita velit veniam unde? Accusantium, natus voluptate!</p>
                </div>
                <div className={styles.right}>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default index