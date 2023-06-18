import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import styles from './CreateDao.module.css';
import moto from "../../../assets/Moto.svg";
import lines from "../../../assets/Lines.png"
import Image from 'next/image';
import thumbpin from "../../../assets/thumbpin.svg";
import { WalletClient, useAccount, useWalletClient } from 'wagmi';
import { createPublicClient, createWalletClient, custom, http, parseUnits } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from "@tableland/sdk";
import daoContractData from "../../../assets/contractData/Dao.json";
import daoContractAddress from "../../../assets/contractData/Dao-address.json";
import lighthouse from '@lighthouse-web3/sdk';
import { DaoContractSchema, daoTableName } from '../../../tableland';
import { useIsMounted } from '../../../hooks/useIsMounted';
import Link from 'next/link';

declare var window: any
const Index = () => {

  //MISCELLANEOUS HELPER FUNCTIONS
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const { address } = useAccount();
  const mounted = useIsMounted();
  const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
  //PREPARING FORM AND FORM DATA
  const [formData, setfirst] = useState({
    heading: "",
    memberCapacity: "",
    information: "",
    image: ""
  })
  const [image, setimage] = useState<File>()
  const [imageURL, setimageURL] = useState("")

  // THESE ARE HOOKS TO INITIATE WALLET CONNECTION AND MANAGE DEPLOYMENT ON CLIENT SIDE
  // const prepareDB = async () => {
  //   const prefix: string = "dao_table";

  //   const { meta: create } = await db
  //     .prepare(`CREATE TABLE ${prefix} (address text primary key, name text,heading text,memberCount integer,additionalInfo text,thumbnail text,DOE text,totalRewarded text);`)
  //     .run();
  //     console.log(create);
      
  //   console.log(create.txn?.name);
  // }
  // useEffect(() => {
  //   if(mounted==true)
  //   prepareDB();
  //   console.log(mounted);
    
  // }, [mounted])

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

  // PREPARING TABLELAND
  const db = new Database<DaoContractSchema>();

  // THIS WILL DEPLOY THE CURRENT DAO CONTRACT AS WELL AS ADD DATA TO TABLELAND
  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log("Deploying the Contract");
    console.log("The Form data is");
    console.log(formData);
    try {
      setloading(true);
      setmessage("Deploying your Dao contract to Calibration Net");
      if (address) {
        const hash = await walletClient.deployContract({
          abi: daoContractData.abi,
          account: address,
          args: [],
          bytecode: `0x${daoContractData.bytecode}`
        })
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log(receipt.contractAddress)
        setmessage("Contract Deployed To Blockchain" + receipt.contractAddress);
        setloading(false);


        const { meta: insert } = await db
          .prepare(
            `INSERT INTO ${daoTableName} (address  , name ,heading ,memberCount ,additionalInfo ,thumbnail ) VALUES (?,?,?,?,?,?);`
          )
          .bind(
            receipt.contractAddress,
            address,
            formData.heading,
            0,
            formData.information,
            formData.image
          )
          .run()
        await insert.txn?.wait();
      }


    } catch (error) {
      console.log(error);

    }
  }


  const uploadImage = async (file: FileList) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    if (lighthouseKey) {
      try {
        console.log(lighthouseKey);
        const output = await lighthouse.upload(file, lighthouseKey);
        console.log('File Status:', output);
  
        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);
       
        
        setfirst({ ...formData, image: `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}` }
        )
      } catch (error) {
        console.log(error);
        
      }
     

    }
  }



  return (
    <div >
      <Navbar />
      <div className={styles.createDaoWrapper}>
        <div className={styles.daoFormContainer1}></div>
        <div className={styles.daoFormContainer2}></div>
        {/* THE MAIN CONTAINER TO WRITE STUFF */}
        <div className={styles.daoFormContainer3}>
          <div className={styles.goback}>
           <Link href="/app/explore">&#60; Go Back</Link>
          </div>
          <div className={styles.daoFormNavbar}>
            <div className={styles.daoFormNavbarUpper}>
              <div className={styles.upperLeft}>
                <div className={styles.upperLine}></div>
                <div className={styles.navDetails}>
                  <Image src={lines} alt="Lines" />
                  <p>CREATE YOUR DAO</p>
                </div>
              </div>
              <div className={styles.upperRight}>
                <Image src={moto} alt="With a Really Low Fee" />
              </div>
            </div>
            <div className={styles.daoFormNavbarLower}>
            </div>
          </div>
          <div className={styles.lowerLine}>
          </div>
          <form className={styles.daoForm}>
            <div className={styles.formLeft}>
              <div className={styles.imageHolderStyling}>
                <Image src={thumbpin} alt="Thumbpin" className={styles.thumbpin} />
                <div>
                  {imageURL == "" ?
                    <input type="file" placeholder='Choose Image'
                      value={imageURL} accept="image/*" onChange={(e) => {

                        if (!e.target.files || e.target.files.length === 0) {
                          setimage(undefined)
                          return
                        }
                        setimage(e.target.files[0]);
                        uploadImage(e.target.files);
                        console.log(e.target.files);
                        console.log(URL.createObjectURL(e.target.files[0]));

                        setimageURL(URL.createObjectURL(e.target.files[0]))

                      }}
                    />
                    :
                    <Image src={imageURL} alt="Uploaded Image" className={styles.uploadedImage} width={300}
                      height={400} />
                  }
                </div>
              </div>
            </div>
            <div className={styles.formRight}>
              <input placeholder='Enter Your Heading' className={styles.heading} value={formData.heading} onChange={(e) => {
                setfirst({ ...formData, heading: e.target.value })
              }} name="Heading" />
              <div className={styles.memberCapacity}>
                Member Capacity <input value={formData.memberCapacity} onChange={(e) => {
                  setfirst({ ...formData, memberCapacity: e.target.value })
                }} />
              </div>
              <textarea placeholder='Add Information About Dao' className={styles.textArea} rows={6}
                value={formData.information} onChange={(e) => {
                  setfirst({ ...formData, information: e.target.value })
                }}
              />
              <div className={styles.daoButton} onClick={handleClick} >
                <button>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Index