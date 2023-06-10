import React from 'react'
import styles from "../../../styles/pages/Explore.module.css";
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import plus from "../../../assets/Plus.svg";
import Image from 'next/image';
import DaoDemo from "../../../assets/DaoDemo.png";
import DaoNav from "../../../components/DaoDashboardNav.tsx/Index";
const index = () => {
  return (
    <div >
      <Navbar />
      <div className={styles.daoViewWrapper}>
        <div className={styles.navWrapper}>
          <div className={styles.upperNav}>
            <div className={styles.dashboardHeader}>
              <p>DAO DASHBOARD</p>
              
              </div>
            <DaoNav />
          </div>
          
        </div>
        <div className={styles.daosList}>
          {/* THIS WILL BE REPEATED OVER */}
          <div className={styles.daoWrapper}>
            <div className={styles.daoLeft}>
              <Image src={DaoDemo} alt="" />
            </div>
            <div className={styles.daoRight}>
              <h2>"BBC NEWS"</h2>
              <div className={styles.Info}>
                <p><span>520</span> Members Joined</p> 
                <p><span>1K</span> FIL Backed</p> 
                
              </div>
              <div className={styles.button}>
                <Link href="/app/exploredao"><button >Explore</button></Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default index