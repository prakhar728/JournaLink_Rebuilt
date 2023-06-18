import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css";
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import likeStats from "../../../assets/likeStats.png";
import uploadStats from "../../../assets/UploadStats.png";
import { useAccount } from 'wagmi';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useRouter } from 'next/router';
const index = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const mounted = useIsMounted();
  const router =useRouter();
  const [ensAvatar, setensAvatar] = useState("");
  const getProfile = async(address:string) =>{
    console.log("here's the profile");
    setensAvatar(`https://effigy.im/a/${address}.png`);
  }
  useEffect(() => {
    if(router.isReady){
      
      if(typeof router.query.address == "string")
        getProfile(router.query.address);
    }
  }, [router.isReady])
  
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
          <Image src={uploadStats} alt="Upload stats" />
          </div>
        </div>
        <div className={styles.l2}>
          <div className={styles.avatar}>
            {ensAvatar &&
                <Image src={ensAvatar}  alt={ensAvatar} width={300} height={300}/>
            }
        
          </div>
          <div className={styles.Details}>
            <div className={styles.quote}>
            "With fearless words and unyielding curiosity, I venture into the heart of stories, unraveling their power."
            </div>
            <div className={styles.ENSNAME}>
            Ruth Vanguard.eth
            </div>
         
          </div>
        </div>
        <div className={styles.l3}>
          <div className={styles.list}>
            News
            <div className={styles.newsList}>
              "Random Text"
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index