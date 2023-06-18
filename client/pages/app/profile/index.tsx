import React, { useEffect, useState } from 'react'
import styles from "./Profile.module.css";
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import likeStats from "../../../assets/likeStats.png";
import uploadStats from "../../../assets/UploadStats.png";
import { useAccount } from 'wagmi';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useRouter } from 'next/router';
import { Database } from '@tableland/sdk';
import { UserSchema, userTableName } from '../../../tableland';
import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { filecoinCalibration, mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';
import Link from 'next/link';
declare var window: any


const index = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const mounted = useIsMounted();
  const router = useRouter();
  const [ensAvatar, setensAvatar] = useState("");
  const [aboutThem, setaboutThem] = useState<UserSchema[]>([]);
  const [ensNNAME, setensNNAME] = useState("address");
  const getProfile = async (address: string) => {
    console.log("here's the profile");
    setensAvatar(`https://effigy.im/a/${address}.png`);
  }
  useEffect(() => {
    if (router.isReady) {

      if (typeof router.query.address == "string")
        getProfile(router.query.address);
    }
  }, [router.isReady])
  const db = new Database<UserSchema>();

  //  const prepareDB = async () => {
  //   const prefix: string = "user_table";

  //   const { meta: create } = await db
  //     .prepare(`CREATE TABLE ${prefix} (address text primary key, quote text, liveLink text)`)
  //     .run();
  //   console.log(create.txn?.name);
  // }
  // useEffect(() => {
  //   if(mounted)
  //   prepareDB();
  //   // test();
  // }, [mounted])
  const publicClient = createPublicClient({
    chain:mainnet ,
    transport: http()
  })
  var walletClient: WalletClient;
  if (typeof window === "object") {
    walletClient = createWalletClient({
      chain: filecoinCalibration,
      transport: custom(window.ethereum)
    })
  }
  const getUserInfo = async () => {
    console.log(router.query);
    
    if (typeof router.query.address == "string") {
     
      
      try {
        const { results } = await db.prepare<UserSchema>(`SELECT * FROM ${userTableName} WHERE address="${router.query.address}" ;`).all();
        console.log(`SELECT * FROM ${userTableName} WHERE address="${router.query.address}" `);
        console.log(results);
        const ensName = await publicClient.getEnsName({
          address: `0x${router.query.address.substring(2,)}`,
          })
          console.log(ensName);
          
          if(ensName)
          {
            setensNNAME(ensName);
            results[0].address = ensName;
            const ensText = await publicClient.getEnsAvatar({
              name: normalize(ensName),
            })
            if(ensText)
            setensAvatar(ensText);
          }
      setaboutThem(results);
          
      } catch (error) {
        console.log(error);
        
      }
    }
  }
  useEffect(() => {
    if (router.isReady  ) {
      if(typeof router.query.address == "string")
      setensNNAME(router.query.address.substring(0,4)+"..."+router.query.address.substring(38,));
      getUserInfo();
    }


  }, [router.isReady])


  return (
    <div className={styles.profileWrapper}>
      <Navbar />
      {router.query.address && router.query.address == address &&
      <>
      <Link href={`/app/createprofile?address=${router.query.address}`}><button>Create Profile</button></Link>
      <Link href={`/app/live?roomid=${aboutThem[0]?.liveLink}`}><button>Go Live</button></Link>
      </>
      }

    {router.query.address && router.query.address != address &&
      <>
      <Link href={`/app/viewlive?roomid=${aboutThem[0]?.liveLink}`}><button>Go Live</button></Link>
      </>
      }   
      <div className={styles.heading}>
        MY PROFILE
      </div>
      <div className={styles.mainContent}>
        {router.query.address && router.query.address == address &&
          <div className={styles.l1}>
            STATS
            <div className={styles.likeStats}>
              <Image src={likeStats} alt="Like stats" />
            </div>
            <div className={styles.uploadStats}>
              <Image src={uploadStats} alt="Upload stats" />
            </div>
          </div>
        }

        <div className={styles.l2}>
          <div className={styles.avatar}>
            {ensAvatar &&
              <Image src={ensAvatar} alt={ensAvatar} width={300} height={300} />
            }

          </div>
          <div className={styles.Details}>
            <div className={styles.quote}>
              {aboutThem.length!=0 && aboutThem[aboutThem.length-1].quote}
            </div>
            <div className={styles.ENSNAME}>
              {ensNNAME}
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