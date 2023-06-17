import React, { useEffect, useState } from 'react'
import styles from "./ExploreDao.module.css"
import Navbar from '../../../components/Navbar'
import Link from 'next/link';
import logoDao from "../../../assets/DaoDemo.png";
import Image from 'next/image';
import { useIsMounted } from '../../../hooks/useIsMounted';
import lighthouse from '@lighthouse-web3/sdk';
import { useRouter } from 'next/router';
import { WalletClient, createPublicClient, createWalletClient, custom, getContract, http } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from '@tableland/sdk';
import { DaoContractSchema, daoTableName, promptSchema, promptTableName } from '../../../tableland';
import downloadButton from "../../../assets/DownloadButton.svg";
import { useAccount, useContractRead } from 'wagmi';
import daoAbi from "../../../assets/contractData/Dao.json";
import help from "../../../helper/help";
declare var window: any

const index = () => {
  // HOOKS FOR NEXTJS INITIALISATION
  const mounted = useIsMounted();
  const router = useRouter();
  const { address } = useAccount();
  const [daoAddress, setdaoAddress] = useState<String>("")
  const [daoInfo, setdaoInfo] = useState<DaoContractSchema[]>([])
  const [prompts, setprompts] = useState<promptSchema[]>([]);
  const [promptDetails, setpromptDetails] = useState([]);
  const [contribute, setcontribute] = useState(false);
  const [contributonData, setContributionData] = useState("");
  const [showContributions, setshowContributions] = useState(false);
  const [contributionsOfAPrompt, setcontributionsOfAPrompt] = useState([]);
  const lighthouseKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

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

  // PUBLIC CALL TO FETCH DATA

  //PREPARING TABLELAND
  const db = new Database<DaoContractSchema>();

  async function fetchDetailForEveryPrompt(prompts: promptSchema[]) {
    var daoAddress = "0x";
    if (typeof router.query.daoId == "string")
      daoAddress = router.query.daoId;
    let arr = [];
    for (let i = 0; i < prompts.length; i++) {
      console.log("here");
      let p = prompts[i];
      let prompId = p.promptid;
      console.log('Wassup', prompId);

      console.log(daoAddress);

      const data = await publicClient.readContract({
        address: `0x${daoAddress.substring(2,)}`,
        abi: daoAbi.abi,
        functionName: 'getProposalDetails',
        args: [prompId]
      })
      console.log(data);
      arr.push(data);
    }
    console.log(arr);
    //@ts-ignore
    setpromptDetails(arr);
  }
  const fetchPrompts = async () => {
    try {
      if (typeof router.query.daoId == "string") {

        console.log((router.query.daoId));
        const addRress = `"${(router.query.daoId)}"`;
        const { results } = await db.prepare<promptSchema>(`SELECT * FROM ${promptTableName} WHERE contractaddress=${addRress} `).all();
        setprompts(results);
        console.log(results);
        fetchDetailForEveryPrompt(results);
      }
    } catch (error) {
      console.log(error);

    }


  }
  const fetchDaoInfo = async () => {
    if (router.query.daoId && typeof router.query.daoId == "string") {
      setdaoAddress(`"${router.query.daoId}"`)
      const addRress = `"${router.query.daoId}"`;
      const { results } = await db.prepare<DaoContractSchema>(`SELECT * FROM ${daoTableName} WHERE address =${addRress} `).all();
      setdaoInfo(results);
      console.log(results);
      fetchPrompts();
    }
  }
  useEffect(() => {
    fetchDaoInfo();
  }, [router.isReady])


  const uploadFileToIPFS = async (file: FileList) => {
    // Push file to lighthouse node
    // Both file and folder are supported by upload function
    if (lighthouseKey) {
      try {
        console.log(lighthouseKey);
        const output = await lighthouse.upload(file, lighthouseKey);
        console.log('File Status:', output);

        console.log('Visit at https://gateway.lighthouse.storage/ipfs/' + output.data.Hash);

        setContributionData(`https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`)
      } catch (error) {
        console.log(error);
      }
    }
  }
  const contributeThis = async (proposalId: string) => {
    if (contributonData != "") {
      if (typeof router.query.daoId == "string") {
        const contractAddress = router.query.daoId;
        const { request } = await publicClient.simulateContract({
          account: address,
          address: `0x${contractAddress.substring(2,)}`,
          abi: daoAbi.abi,
          functionName: 'commitData',
          args: [proposalId, contributonData]
        })
        await walletClient.writeContract(request)
      }

    }
  }
  const rewardMembers = async (proposalId:string) =>{
    console.log('Members are being Rewarded');
    if (typeof router.query.daoId == "string") {
      const contractAddress = router.query.daoId;
      const { request } = await publicClient.simulateContract({
        account: address,
        address: `0x${contractAddress.substring(2,)}`,
        abi: daoAbi.abi,
        functionName: 'rewardMembers',
        args: [proposalId]
      })
      await walletClient.writeContract(request)
      console.log("Rewarded");
      
    }
  }

  const showAllContributions = async (promptId:string) =>{
    console.log("Getting all members");
    const allMembers = await publicClient.readContract({
      address: `0x${(daoInfo[0].address).substring(2,)}`,
      abi: daoAbi.abi,
      functionName: 'getAllMembers',
    })
    console.log(allMembers);
    console.log('Gathtering Contributions');
    var contArr = [];
    var Allcontributions;
    //@ts-ignore
    for(let i=0;i<allMembers.length;i++){
       Allcontributions = await publicClient.readContract({
        address: `0x${(daoInfo[0].address).substring(2,)}`,
        abi: daoAbi.abi,
        functionName: 'getCommits',
        //@ts-ignore
        args:[allMembers[i],promptId]
      })
      console.log(Allcontributions);
      contArr.push(Allcontributions);
    }
    //@ts-ignore
    setcontributionsOfAPrompt(contArr);
    console.log(contArr);
    
  }
  return (
    <div>
      <Navbar />
      {(daoInfo.length != 0) &&
        <div className={styles.daoWrapper}>
          <div className={styles.nav}>
            <Link href="/app/explore"> &lt; Go Back </Link>
            <h2>{prompts.length} Prompts Till Now</h2>
            {address === daoInfo[0].name && <Link href={`/app/addprompts?contractAddress=${daoInfo[0].address}`} className={styles.promptButton}>
              <button>Start a Prompt</button>
            </Link>}
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
              {/* BEGIN THE DUPLICATION */}
              {promptDetails.length != 0 && prompts.length != 0 &&
                prompts.map((prompt, index:number) => {
                  return (
                    <div className={styles.promptWrapper} key={index}>
                      <div className={styles.info1}>
                        <div> Valid Till - 31/05/2002</div>
                        <div> {prompt.promptid}</div>
                      </div>
                      <div className={styles.info2}>{prompt.heading}</div>
                      <div className={styles.info3}>{prompt.description}</div>
                      {address == daoInfo[0].name?
                      <div className={styles.info4}>
                      <Link href={`${daoInfo[0].address}`} 
                      onClick={()=>rewardMembers(prompt.promptid.toString())}
                      ><button>Reward Members <Image src={downloadButton} alt="Download Requirements" /></button></Link>
                      <Link href={`${daoInfo[0].address}`} onClick={() => {
                        showAllContributions((prompt.promptid).toString());
                        setshowContributions(true);
                      }}><button>Show Contributions</button></Link>
                      {showContributions && <div className={styles.contributionList}>
                        {contributionsOfAPrompt.length!=0 &&
                        contributionsOfAPrompt.map((c,i)=>{
                          return(
                            <Link href={c[0]} key={i}>{c}</Link>
                          )
                        })
                        }
                        <button onClick={()=>{
                          setshowContributions(false);
                        }}>Done</button>
                        </div>}
                    </div>
                      :
                      <div className={styles.info4}>
                        <Link href={promptDetails[index][0]}><button>Requirements <Image src={downloadButton} alt="Download Requirements" /></button></Link>
                        <Link href={`${daoInfo[0].address}`} onClick={() => {
                          setcontribute(true);
                        }}><button>Contribute</button></Link>
                        {
                          contribute &&
                          <div className={styles.contributeForm}>
                            <input type="file" onChange={(e) => {
                              if (e.target.files)
                                uploadFileToIPFS(e.target.files)
                            }} />
                            <button onClick={(e) => {
                              contributeThis((prompt.promptid).toString());
                              setcontribute(false);
                            }
                            }>Contribute Now!</button>
                          </div>
                        }

                      </div>
                    
                    }
                      
                    </div>
                  )
                })
              }
              {/* <div className={styles.promptWrapper}>
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
              </div> */}
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default index