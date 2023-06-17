import React from 'react'
import styles from "./Loading.module.css";
import loading from "../../assets/loading.gif";
import Image from 'next/image';
const Index = ({ message }:{message:String}) => {
  console.log(message);
  
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.mainContent}>
        <div className={styles.imageWrapper}>
          <Image src={loading} alt="Loading Content" />
        </div>
        <div className={styles.messageWrapper}>
          <p>
            {message}
          </p>
        </div>
      </div>

    </div>
  )
}

export default Index