import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import lines from "../../../assets/Lines.png"
import styles from "./CreateNews.module.css";
import thumbpin from "../../../assets/thumbpin.svg";
import moto from "../../../assets/Moto.svg";
import Image from 'next/image';
import { WalletClient, useAccount, useWalletClient } from 'wagmi';
import { createPublicClient, createWalletClient, custom, http, parseUnits } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from "@tableland/sdk";
import daoContractData from "../../../assets/contractData/Dao.json";
import daoContractAddress from "../../../assets/contractData/Dao-address.json";
import lighthouse from '@lighthouse-web3/sdk';
import { DaoContractSchema, daoTableName, newsSchema, newsTableName } from '../../../tableland';
import { useIsMounted } from '../../../hooks/useIsMounted';
import lighthouseIMG from "../../../assets/lighthouse.png";
import huddleImg from "../../../assets/Huddle.png";
import Link from 'next/link';
import { randomBytes } from 'crypto';
import { useRouter } from 'next/router';
const axios = require('axios').default;

declare var window: any



const index = () => {
  //MISCELLANEOUS HELPER FUNCTIONS
  const [loading, setloading] = useState(false);
  const [message, setmessage] = useState("");
  const { address } = useAccount();
  const mounted = useIsMounted();
  const [image, setimage] = useState<File>()
  const [imageURL, setimageURL] = useState("");
  const router = useRouter()
  const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
  //PREPARING FORM AND FORM DATA
  const [formData, setFormData] = useState({
    heading: "",
    memberCapacity: "",
    information: "",
    image: "",
    videoURL: "",
    tags:""
  })
  function generateRandomNumber(): string {
    const randomBytesBuffer = randomBytes(8);
    const randomSixDigitNumber = parseInt(randomBytesBuffer.toString('hex'), 16)
      .toString()
      .slice(0, 6);
  
    return randomSixDigitNumber;
  }

  // THESE ARE HOOKS TO INITIATE WALLET CONNECTION AND MANAGE DEPLOYMENT ON CLIENT SIDE
  // const prepareDB = async () => {
  //   const prefix: string = "news_table";

  //   const { meta: create } = await db
  //     .prepare(`CREATE TABLE ${prefix} (newsID text primary key, creatoraddress text,headline text,newsinfo text,tags text,thumbnail text, videoURL text, likes integer, DOC text);`)
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
  const db = new Database<newsSchema>();

  // THIS WILL DEPLOY THE CURRENT DAO CONTRACT AS WELL AS ADD DATA TO TABLELAND
  const handleClick = async (e: any) => {
    e.preventDefault();
    console.log("Uploading News Securely");
    console.log("The Form data is");
    console.log(formData);
    const newsID = generateRandomNumber();
    console.log("News ID is",newsID);
    console.log(Date.now());
    
    try {
      setloading(true);
      if (address) {
        const { meta: insert } = await db
          .prepare(
            `INSERT INTO ${newsTableName} (newsID , creatoraddress ,headline ,newsinfo ,tags ,thumbnail , videoURL , likes , DOC  ) VALUES (?,?,?,?,?,?,?,?,?);`
          )
          .bind(
            newsID,
            address,
            formData.heading,
            formData.information,
            formData.tags,
            formData.image,
            formData.videoURL,
            0,
            Date.now()
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


        setFormData({ ...formData, image: `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}` }
        )
      } catch (error) {
        console.log(error);

      }


    }
  }

  const uploadVideo = async (file: FileList) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    if (lighthouseKey) {
      try {
        console.log(lighthouseKey);
        const output = await lighthouse.upload(file, lighthouseKey);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);

        setFormData({ ...formData, videoURL: `https://gateway.lighthouse.storage/ipfs/${output.data.Hash}` }
        )
      } catch (error) {
        console.log(error);
      }
    }
  }

  const getAndNavigateToRoom = async () => {

    try {
        if (process.env.NEXT_PUBLIC_HUDDLE_KEY_API) {
            const HUDDLE_KEY = process.env.NEXT_PUBLIC_HUDDLE_KEY_API;
            console.log(HUDDLE_KEY);
            
            const response = await axios.post(
                'https://api.huddle01.com/api/v1/create-room',
                {
                    title: 'Recording Video for News',
                    hostWallets: [address],
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': 'HBUwrTzM39K8BSQAWucFOZBZ_0-jsyWN',
                    },
                }
            );
            // console.log(response.data.data.roomId);

            const roomId = response.data.data.roomId;
            router.push(`/app/record?roomid=${roomId}`)
        }
    } catch (error: any) {
        console.log(error);

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
        <Link href="/app/news" className={styles.backArrow}> &#60; Go Back </Link>
          <div className={styles.daoFormNavbar}>
            <div className={styles.daoFormNavbarUpper}>
              <div className={styles.upperLeft}>
                <div className={styles.upperLine}></div>
                <div className={styles.navDetails}>
                  <Image src={lines} alt="Lines" />
                  <p>CREATE YOUR NEWS</p>
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
              { formData.videoURL==""?<> <div className={styles.fileUploadHuddle}>
                <div onClick={getAndNavigateToRoom} >
                  Record Video <Image src={huddleImg} alt="Upload Using Ligthhouse" />
                </div>
              </div>
              <div className={styles.fileUploadLighthouse}>
                <div>
                Upload Video <Image src={lighthouseIMG} alt="Upload Using Ligthhouse"  />
                <input type="file" onChange={(e)=>{
                  if(e.target.files)
                    uploadVideo(e.target.files);
                  }}/>
                </div>
              </div>
              </>:
              <div className={styles.uploadedData}>
                Data uploaded
                <Link href={formData.videoURL}>View</Link>
                </div>
              }
              
            </div>
            <div className={styles.formRight}>
              <input placeholder='Enter Headline of News' className={styles.heading} value={formData.heading} onChange={(e) => {
                setFormData({ ...formData, heading: e.target.value })
              }} name="Heading" />

              <textarea placeholder='Enter description of News' className={styles.textArea} rows={6}
                value={formData.information} onChange={(e) => {
                  setFormData({ ...formData, information: e.target.value })
                }}
              />
              <input type="text"placeholder='You can even paste the IPFS Link' value={formData.videoURL}  onChange={e=>{
                setFormData({...formData,videoURL:e.target.value})
              }} className={styles.videoURL} />
              <div className={styles.daoButton}  >
                <input type="text" placeholder='Enter comma separated tags' value={formData.tags} onChange={e=>{
                  setFormData({...formData,tags:e.target.value})
                }}/>
                <button onClick={handleClick}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default index