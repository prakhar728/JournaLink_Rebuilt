import React, { useEffect, useState } from 'react'
import styles from "./ExploreDao.module.css"
import Navbar from '../../../components/Navbar'
import Link from 'next/link';
import logoDao from "../../../assets/DaoDemo.png";
import Image from 'next/image';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useRouter } from 'next/router';
import { WalletClient, createPublicClient, createWalletClient, custom, http } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from '@tableland/sdk';
import { DaoContractSchema, daoTableName } from '../../../tableland';
import downloadButton from "../../../assets/DownloadButton.svg";
declare var window: any

const index = () => {
  // HOOKS FOR NEXTJS INITIALISATION
  const mounted = useIsMounted();
  const router = useRouter()
  const [daoAddress, setdaoAddress] = useState<String>("")
  const [daoInfo, setdaoInfo] = useState<DaoContractSchema[]>([])


  // PUBLIC CALL TO FETCH DATA

  //PREPARING TABLELAND
  const db = new Database<DaoContractSchema>();


  const fetchDaoInfo = async () => {
    if (router.query.daoId && typeof router.query.daoId == "string") {
      setdaoAddress(router.query.daoId)
      const addRress = `"${router.query.daoId}"`;
      const { results } = await db.prepare<DaoContractSchema>(`SELECT * FROM ${daoTableName} WHERE address =${addRress} `).all();
      setdaoInfo(results);
      console.log(results);
    }
  }
  useEffect(() => {
    fetchDaoInfo();
  }, [router.isReady])

  // ENAB
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
  return (
    <div>
      <Navbar />
      {daoInfo.length != 0 &&
        <div className={styles.daoWrapper}>
          <div className={styles.nav}>
            <Link href="/app/explore"> &lt; Go Back </Link>
            <h2>0 Prompts Till Now</h2>
          </div>
          <div className={styles.main}>
            <div className={styles.left}>
              <Image src={daoInfo[0].thumbnail} alt="Logo of dao" width={300} height={300} />
              <h2>{daoInfo[0].heading}</h2>
              <p><span>{daoInfo[0].memberCount}</span> Members Joined</p>
              <p><span>10 </span> FIL Rewarded</p>
              <p>{daoInfo[0].additionalInfo}</p>
            </div>
            <div className={styles.right}>
              <div className={styles.promptWrapper}>
                <div className={styles.info1}>
                  <div> Valid Till - 31/05/2002</div>
                  <div> 123456789</div>
                </div>
                <div className={styles.info2}>“Social media: Does it bring people together or create division?”</div>
                <div className={styles.info3}>Social media is a subject of debate,  whether it bridges or fractures connections. Express your opinion regarding the same.</div>
                <div className={styles.info4}>
                  <Link href="/"><button>Requirements <Image src={downloadButton} alt="Download Requirements" /></button></Link>
                  <Link href="/"><button>Contribute</button></Link>

                </div>
              </div>
              
              
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default index