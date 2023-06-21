import React, { useEffect, useMemo, useState } from 'react'
import styles from "./ExploreDao.module.css"
import Navbar from '../../../components/Navbar'
import Link from 'next/link';
import Image from 'next/image';
import { useIsMounted } from '../../../hooks/useIsMounted';
import lighthouse from '@lighthouse-web3/sdk';
import { useRouter } from 'next/router';
import { BaseError, ContractFunctionRevertedError, WalletClient, createPublicClient, createWalletClient, custom,  http } from 'viem';
import { filecoinCalibration } from 'viem/chains';
import { Database } from '@tableland/sdk';
import { DaoContractSchema, daoTableName, promptSchema, promptTableName } from '../../../tableland';
import downloadButton from "../../../assets/DownloadButton.svg";
import { useAccount} from 'wagmi';
import daoAbi from "../../../assets/contractData/Dao.json";
import LoadingC from "../../../components/Loading/Index";
import ErrorComponent from "../../../components/Error/Index";
declare var window: any

const Index = () => {
  // HOOKS FOR NEXTJS INITIALISATION
  const router = useRouter();
  const { address } = useAccount();
  const [daoInfo, setdaoInfo] = useState<DaoContractSchema[]>([])
  const [prompts, setprompts] = useState<promptSchema[]>([]);
  const [promptDetails, setpromptDetails] = useState([]);
  const [contribute, setcontribute] = useState(false);
  const [contributonData, setContributionData] = useState("");
  const [showContributions, setshowContributions] = useState(false);
  const [contributionsOfAPrompt, setcontributionsOfAPrompt] = useState([]);
  const [loading, setloading] = useState(false);
  const [mesage, setmesage] = useState("");
  const [errorStatus, seterrorStatus] = useState(false);
  const [errorMessage, seterrorMessage] = useState("")
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
  const db = useMemo(() => {
    // Construct the `db` object here
    return new Database<DaoContractSchema>();
  }, []); 
  
  
  
  useEffect(() => {
    setmesage("Loading Dao");
    setloading(true);
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
      setloading(false);
      setmesage("");
      //@ts-ignore
      setpromptDetails(arr);
    }
    const fetchPrompts = async () => {
      setmesage("Now loading Available Prompts");
      try {
        if (typeof router.query.daoId == "string") {
  
          console.log((router.query.daoId));
          const addRress = `"${(router.query.daoId)}"`;
          const { results } = await db.prepare<promptSchema>(`SELECT * FROM ${promptTableName} WHERE contractaddress=${addRress} `).all();
          setprompts(results);
          console.log(results);
          setmesage("Syncing with Smart Contract");
          fetchDetailForEveryPrompt(results);
        }
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    }
    const fetchDaoInfo = async () => {
      try {
         if (router.query.daoId && typeof router.query.daoId == "string") {
      const addRress = `"${router.query.daoId}"`;
      const { results } = await db.prepare<DaoContractSchema>(`SELECT * FROM ${daoTableName} WHERE address =${addRress} `).all();
      setdaoInfo(results);
      console.log(results);
      fetchPrompts();
    }
      } catch (error) {
        console.log(error);
      }
   
  }
  if(typeof window !=="undefined")
    fetchDaoInfo();
  }, [router.query.daoId,db,publicClient])


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
    setloading(true);
    setmesage("Contributing  Data")
    if (contributonData != "") {
      if (typeof router.query.daoId == "string") {
        const contractAddress = router.query.daoId;
        try {
    setmesage("Approve the Transaction in your wallet");
          const { request } = await publicClient.simulateContract({
            account: address,
            address: `0x${contractAddress.substring(2,)}`,
            abi: daoAbi.abi,
            functionName: 'commitData',
            args: [proposalId, contributonData]
          })
          await walletClient.writeContract(request);
          const memberCount = daoInfo[0].memberCount+1;
          const addRress = `"${router.query.daoId}"`;
          const { meta: insert } = await db
          .prepare(
            `UPDATE ${daoTableName}
            SET memberCount =${memberCount}
            WHERE address =${addRress}`
          )
          .run()
        await insert.txn?.wait();
        } catch (err) {
          setloading(false);
        setmesage("");
        //@ts-ignore
       console.log(JSON.parse((JSON.stringify(err))).details);
       seterrorMessage(JSON.parse((JSON.stringify(err))).details);
       seterrorStatus(true);
       
      }
      setloading(false);
      setmesage("");
        
      }

    }
  }
  const rewardMembers = async (proposalId:string) =>{
    console.log('Members are being Rewarded');
    setloading(true);
    setmesage("Rewarding members.")
    if (typeof router.query.daoId == "string") {
      const contractAddress = router.query.daoId;
      try {
    setmesage("Approve the Transaction in your wallet");
        const { request } = await publicClient.simulateContract({
          account: address,
          address: `0x${contractAddress.substring(2,)}`,
          abi: daoAbi.abi,
          functionName: 'rewardMembers',
          args: [proposalId]
        })
        await walletClient.writeContract(request)
       setmesage("Processing the Tx please wait!")
        console.log("Rewarded");
      } catch (err:any) {
        setloading(false);
        setmesage("");
        //@ts-ignore
       console.log(JSON.parse((JSON.stringify(err))).details);
       seterrorMessage(JSON.parse((JSON.stringify(err))).details);
       seterrorStatus(true);
       
      }
      setloading(false);
      setmesage("");
      
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
      {loading && <LoadingC message={mesage} />}
      {errorStatus && <ErrorComponent message={errorMessage} setErrorStatus={seterrorStatus}/>}
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
                        <div> Valid Till - {prompt.DOE}</div>
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
            </div>
          </div>
        </div>
      }

    </div>
  )
}

export default Index