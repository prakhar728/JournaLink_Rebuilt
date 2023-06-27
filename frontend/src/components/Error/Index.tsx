import React from 'react'
import styles from "./Error.module.css"
import error from "../../assets/error.gif";
import Image from 'next/image';
const Index = ({message, setErrorStatus}:{message:string,setErrorStatus:any}) => {
  return (
    <div className={styles.errorMessage}>
     
      <div className={styles.mainContent}>
      <div className={styles.closeButton}>
        <button onClick={e=>{
          setErrorStatus(false);
        }}>x</button>
      </div>
        <div className={styles.imageWrapper}>
          <Image src={error} alt="Error Here" />
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