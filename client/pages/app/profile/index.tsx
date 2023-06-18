import React from 'react'
import styles from "./Profile.module.css";
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import likeStats from "../../../assets/likeStats.png";
const index = () => {
  return (
    <div className={styles.profileWrapper}>
      <Navbar />
      <div className={styles.heading}>
        MY PROFILE
      </div>
      <div className={styles.mainContent}>
        <div className={styles.l1}>
          STATS
          <div className={styles.likeStats}>
            <Image src={likeStats} alt="Like stats" />
          </div>
          <div className={styles.uploadStats}>

          </div>
        </div>
        <div className={styles.l2}>
          <div className={styles.avatar}>

          </div>
          <div className={styles.Details}>
            <div className={styles.quote}>

            </div>
            <div className={styles.ENSNAME}>

            </div>
            <div className={styles.WalletID}>

            </div>
          </div>
        </div>
        <div className={styles.l3}>
          <div className={styles.list}>
            News
            <div>
              Random Text
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index