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
      <Link href="/app/viewdao" className={`${styles.navLink} ${activeElement=== '3' ? styles.active : ''
          }`} onClick={(e)=>{
        setactiveElement("3");
      }}>View your DAOs</Link>
      <Link href="/app/showcommits" className={`${styles.navLink} ${activeElement=== '4' ? styles.active : ''
          }`} onClick={(e)=>{
        setactiveElement("4");
      }}>Show Commits</Link>
    </div>
  )
}

export default Index