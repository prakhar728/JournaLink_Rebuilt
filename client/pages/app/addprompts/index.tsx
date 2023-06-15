import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import styles from './addprompt.module.css';
import moto from "../../../assets/Moto.svg";
import lines from "../../../assets/Lines.png"
import Image from 'next/image';
import thumbpin from "../../../assets/thumbpin.svg";
import { WalletClient, useAccount, useWalletClient } from 'wagmi';
import { createPublicClient, createWalletClient, custom, http, parseEther, parseUnits } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from "@tableland/sdk";
import daoContractData from "../../../assets/contractData/Dao.json";
import daoContractAddress from "../../../assets/contractData/Dao-address.json";
import lighthouse from '@lighthouse-web3/sdk';
import { DaoContractSchema, daoTableName, promptTableName } from '../../../tableland';
import upload from "../../../assets/UploadIcon.svg";
import { useIsMounted } from '../../../hooks/useIsMounted';
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router';
import { createHash, randomBytes } from 'crypto';

declare var window: any
const Index = () => {

  //MISCELLANEOUS HELPER FUNCTIONS
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const { address } = useAccount();
  const [selectedFile, setSelectedFile] = useState<File>();
  const mounted = useIsMounted();
  const [contractAddress, setContractAddress] = useState("")
  const router = useRouter();
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    uploadFileToIPFS(event.target.files);
    setSelectedFile(file);
  };
  const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
  //PREPARING FORM AND FORM DATA
  const [formData, setFormData] = useState({
    heading: "",
    Description: "",
    fileURL: "",
    amount: "0",
    DOE: "",
    capacity: ""
  })
  const getDaoAddress = async () => {
    if (typeof router.query.contractAddress == "string") {
      const address = router.query.contractAddress.substring(2,);
      setContractAddress(address);
      console.log(address);

    }

  }
  useEffect(() => {
    getDaoAddress();

  }, [mounted])

  function generateRandomNumber(): string {
    const randomBytesBuffer = randomBytes(8);
    const randomSixDigitNumber = parseInt(randomBytesBuffer.toString('hex'), 16)
      .toString()
      .slice(0, 6);
  
    return randomSixDigitNumber;
  }

  // THESE ARE HOOKS TO INITIATE WALLET CONNECTION AND MANAGE DEPLOYMENT ON CLIENT SIDE
  interface tData {
    Name: String,
    Hash: String,
    Size: String
  }
  // const test = async () =>{
  //   if(lighthouseKey){
  //     const response = await lighthouse.uploadText(
  //       "This is a string",
  //       lighthouseKey
  //     );

  //     console.log(response);

  //   }

  // }
  // const prepareDB = async () => {
  //   const prefix: string = "prompt_table";

  //   const { meta: create } = await db
  //     .prepare(`CREATE TABLE ${prefix} (promptid text primary key, contractaddress text,heading text,description text)`)
  //     .run();
  //   console.log(create.txn?.name);
  // }
  // useEffect(() => {
  //   prepareDB();
  //   // test();
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

  // THIS WILL ADD THE PROMPT TO CONTRACT AND SOME DETAILS TO TABLELAND SQL
  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log("Uploading Prompt to Contract");
    console.log("The Form data is");
    console.log(formData);
    try {
      setloading(true);
      setmessage("Uploading Prompt to Contract");
      if (address) {
        const promptId = generateRandomNumber();
        console.log('Unique id for prompt', promptId);
        const amt = parseInt(formData.amount);
        const hash = await walletClient.writeContract({
          address: `0x${contractAddress}`,
          abi: daoContractData.abi,
          functionName: 'createProposal',
          args: [promptId, formData.fileURL,parseInt(formData.capacity) ],
          account: address,
          // @ts-ignore
          value:parseUnits(`${amt}`,18)
        })
        
        setmessage("Prompt Uploaded to Contract" + hash);
        setloading(false);

        const { meta: insert } = await db
          .prepare(
            `INSERT INTO ${promptTableName} (promptid , contractaddress, heading,description  ) VALUES (?,?,?,?);`
          )
          .bind(
            promptId,
            contractAddress,
            formData.heading,
            formData.Description
          )
          .run()
        await insert.txn?.wait();
      }


    } catch (error) {
      console.log(error);

    }
  }


  const uploadFileToIPFS = async (file: FileList) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    if (lighthouseKey) {
      try {
        console.log(lighthouseKey);
        const output = await lighthouse.upload(file, lighthouseKey);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);

        setFormData({ ...formData, fileURL: `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}` }
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
          <div className={styles.daoFormNavbar}>
            <div className={styles.daoFormNavbarUpper}>
              <div className={styles.upperLeft}>
                <div className={styles.upperLine}></div>
                <div className={styles.navDetails}>
                  <Image src={lines} alt="Lines" />
                  <p>Start a Prompt</p>
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
          <div className={styles.formheading}>Add Something You want to talk about</div>
          <form className={styles.daoForm}>
            <div className={styles.innerForm}>
              <div className={styles.formLeft}>
                <input type="text" placeholder='Your Heading' value={formData.heading
                } onChange={(e)=>{
                  setFormData({...formData,heading:e.target.value})
                }} />
                <textarea placeholder='Add Description' rows={8} value={formData.Description
                } onChange={(e)=>{
                  setFormData({...formData,Description:e.target.value})
                }} />
                <div className={styles.file}>
                  <input type="file" onChange={handleFileChange} />
                  {!selectedFile && (
                    <div className="placeholderText">Upload requirements
                      <Image src={upload} alt="Upload requirements" />
                    </div>
                  )}
                  {selectedFile && (
                    <div className="selectedFileName">{selectedFile.name}</div>
                  )}

                </div>
              </div>
              <div className={styles.formRight}>
                <input type="text" placeholder='Amount of pool prize' value={formData.amount
                } onChange={(e)=>{
                  setFormData({...formData,amount:e.target.value})
                }} />
                <div className={styles.DOE}>
                  Date of Expiration
                  <input type="datetime-local" className={styles.inputDate} placeholder="Date of expiration" value={formData.DOE
                } onChange={(e)=>{
                  setFormData({...formData,DOE:e.target.value})
                }}/>
                </div>
                <div className={styles.memberCapacity} >
                  Member Capacity
                  <input value={formData.capacity
                } onChange={(e)=>{
                  setFormData({...formData,capacity:e.target.value})
                }}/>
                </div>

              </div>
            </div>

          <button className={styles.submit} onClick={handleClick}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Index