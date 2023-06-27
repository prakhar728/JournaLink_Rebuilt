import React, { useState } from 'react'
import styles from './DaoNav.module.css';
import Link from 'next/link';
const Index = () => {
  const [activeElement, setactiveElement] = useState("1");
  const handleClick = (e:any) =>{
    console.log('Clicked');
  }
  return (
    <div className={styles.daoNav}>
      <Link href="/app/explore"  className={`${styles.navLink} ${activeElement=== '1' ? styles.active : ''
          }`} onClick={(e)=>{
        setactiveElement("1");
      }}>Explore DAOs</Link>
      <Link  href="/app/createdao" className={`${styles.navLink} ${activeElement=== '2' ? styles.active : ''
          }`} onClick={(e)=>{
        setactiveElement("2");
      }}>Create DAO +</Link>
    </div>
  )
}

export default Index