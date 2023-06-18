import React, { useState } from 'react'
import styles from "./CProfile.module.css";
import Navbar from '../../../components/Navbar';
import { useAccount } from 'wagmi';
import axios from 'axios';
import { UserSchema } from '../../../tableland';
import { Database } from '@tableland/sdk';
import { userTableName } from '../../../tableland';
import { useRouter } from 'next/router';
const index = () => {
    const [formData, setformData] = useState({
        quote:"",
        meet:""
    })
    const router = useRouter();
    const{address} = useAccount();
  
    const createMeet = async () => {

        try {
            if (process.env.NEXT_PUBLIC_HUDDLE_KEY_API) {
                const HUDDLE_KEY = process.env.NEXT_PUBLIC_HUDDLE_KEY_API;
                console.log(HUDDLE_KEY);
                console.log(address);
                
                const response = await axios.post(
                    'https://api.huddle01.com/api/v1/create-room',
                    {
                        title: 'Recording Video for News',
                        hostWallets: [address],
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-api-key': HUDDLE_KEY,
                        },
                    }
                );
                // console.log(response.data.data.roomId);
    
                const roomId = response.data.data.roomId;
                setformData({...formData,meet:roomId});
            }
        } catch (error: any) {
            console.log(error);
        }
    }
    const db = new Database<UserSchema>();

    const handleUpdate = async () =>{
        ;
try {
    console.log(formData);
    console.log(`UPDATE ${userTableName}
    SET quote = '${formData.quote}', liveLink = '${formData.meet}'
    WHERE address ='${router.query.address}'`);
    // const { meta: insert } = await db
    //       .prepare(
    //         `UPDATE ${userTableName}
    //         SET quote = '${formData.quote}', liveLink = '${formData.meet}'
    //         WHERE address ='${router.query.address}'`
    //       )
    //       .run()
    const { meta: insert } = await db
    .prepare(
      `INSERT INTO ${userTableName} (address,quote,liveLink ) VALUES (?,?,?);`
    )
    .bind(
      router.query.address,
      formData.quote,
      formData.meet
    )
    .run()
  await insert.txn?.wait();
          
} catch (error) {
    
}
    }
  return (
    <div >
        <Navbar />
        <div className={styles.formWrapper}>
            <textarea  placeholder='Say something about you' value={formData.quote} onChange={e=>{
                setformData({...formData,quote:e.target.value});
            }}/>
            <button onClick={createMeet}>Generate Meet Link</button>
            <button onClick={handleUpdate}>Update Profile</button>
        </div>
    </div>
  )
}

export default index