import React, { useEffect } from 'react'
import styles from "./Explore.module.css";
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import DaoDemo from "../../../assets/DaoDemo.png";
import DaoNav from "../../../components/DaoDashboardNav.tsx/Index";
import { Database } from '@tableland/sdk';
import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { WalletClient } from 'wagmi';
import { filecoinCalibration } from 'viem/chains';
import {DaoContractSchema, daoTableName} from "../../../tableland/index";
declare var window: any

const Index = () => {
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
    try {
      const { results } = await db.prepare<DaoContractSchema>(`SELECT * FROM ${daoTableName};`).all();
      console.log(results);
    } catch (error) {
      console.log(error);
      
    }
   
    
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
          {/* THIS WILL BE REPEATED OVER */}
          <div className={styles.daoWrapper}>
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
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Index