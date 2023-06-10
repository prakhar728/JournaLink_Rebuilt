import React from 'react'
import styles from "../../../styles/Daos.module.css";
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import plus from "../../../assets/Plus.svg";
import Image from 'next/image';
import DaoDemo from "../../../assets/DaoDemo.png";
const index = () => {
  return (
    <div >
      <Navbar />
      <div className={styles.daoViewWrapper}>
        <div className={styles.navWrapper}>
          <div className={styles.upperNav}>
            <h1>DAO DASHBOARD</h1>
            <Link href="/app/createdao">
              Create your Own Dap
              <Image src={plus} alt="Create Dao ICON" />
            </Link>
          </div>
          <div className={styles.lowerNav}>

          </div>
        </div>
        <div className={styles.daosList}>
          <div className={styles.daoWrapper}>
            <div className={styles.daoLeft}>
              <Image src={DaoDemo} alt="" />
            </div>
            <div className={styles.daoRight}>
              <h2>BBC NEWS</h2>
              <h4>The BBC is the world's leading public service broadcaster</h4>
              <div className={styles.buttonAndInfo}>
                <div>
                  Members Joined <br />
                  420
                </div>
                <div>
                  <button>Info</button>
                  <button>Join</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index