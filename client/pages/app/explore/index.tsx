import React, { useEffect, useState } from 'react'
import styles from "./Explore.module.css";
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import DaoNav from "../../../components/DaoDashboardNav.tsx/Index";
import { Database } from '@tableland/sdk';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { WalletClient, useAccount } from 'wagmi';
import { filecoinCalibration } from 'viem/chains';
import {DaoContractSchema, daoTableName} from "../../../tableland/index";
import LoadingC from "../../../components/Loading/Index";
declare var window: any

const Index = () => {
  const [daos, setdaos] = useState<DaoContractSchema[]>([]);
  const [loading, setloading] = useState(true);
  const [message, setmessage] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount()
  var walletClient: WalletClient;
  if (typeof window === "object") {
    walletClient = createWalletClient({
      chain: filecoinCalibration,
      transport: custom(window.ethereum)
    })
  }

  const publicClient = createPublicClient({
    chain: filecoinCalibration,
    transport: http()
  })

  //NOW WE'LL GATHER THE DAOS AVAILABLE TO VIEW
  const db = new Database<DaoContractSchema>();
  const prepareData = async() =>{
    setmessage("Gathering Daos For You!");
    setloading(true);
    try {
      const { results } = await db.prepare<DaoContractSchema>(`SELECT * FROM ${daoTableName};`).all();
      console.log(results);
      setdaos(results);
      setmessage("Storing Daos");
      setloading(true);
    } catch (error) {
      console.log(error);
      setmessage("Failed to store dao");
      setloading(false);
    }
    setmessage("");
   setloading(false);
  }
  useEffect(() => {
    prepareData();
  }, [])
  
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
          {loading && <LoadingC message={message}/>}
          {daos.length !=0 && 
          daos.map((dao,index)=>{
            return(
              <div className={styles.daoWrapper} key={index}>
              <div className={styles.daoLeft}>
                <Image src={dao.thumbnail} alt={`Thumbnail of ${dao.heading}`} width={300} height={300} />
              </div>
              <div className={styles.daoRight}>
                <h2> &quot; {dao.heading} &quot;</h2>
                <div className={styles.Info}>
                  <p><span>{dao.memberCount}</span> Members Joined</p> 
                  <p><span>0</span> FIL Backed</p> 
                  
                </div>
                <div className={styles.button} >
                  <Link href={`/app/explore/${dao.address}`}><button > {dao.name==address?'Analyse':'Explore'}  </button></Link>
                </div>
              </div>
            </div>
            )
           
          })
          }
          {/* THIS WILL BE REPEATED OVER */}
          {/* <div className={styles.daoWrapper}>
            <div className={styles.daoLeft}>
              <Image src={DaoDemo} alt="" />
            </div>
            <div className={styles.daoRight}>
              <h2> &quot; BBC NEWS &quot;</h2>
              <div className={styles.Info}>
                <p><span>520</span> Members Joined</p> 
                <p><span>1K</span> FIL Backed</p> 
                
              </div>
              <div className={styles.button}>
                <Link href="/app/exploredao"><button >Explore</button></Link>
              </div>
            </div>
          </div> */}
          
        </div>
      </div>
    </div>
  )
}

export default Index