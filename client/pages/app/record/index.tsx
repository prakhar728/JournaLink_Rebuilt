import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useEventListener, useHuddle01 } from '@huddle01/react';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useAudio, useLobby, useVideo } from '@huddle01/react/hooks';
import { useRouter } from 'next/router';
import styles from "./Record.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import record from "../../../assets/Record.png";
import Camera from "../../../assets/Camera.png";
import mic from "../../../assets/Mic.png";
import exit from "../../../assets/exit.png";
import Image from 'next/image';
const index = () => {
    const { initialize, isInitialized } = useHuddle01();
    const { joinLobby, isLobbyJoined, error } = useLobby();
    const router = useRouter()
    const mounted = useIsMounted();
    const [roomId, setroomId] = useState("");
    const { fetchAudioStream, stopAudioStream, error: micError } = useAudio();
    const { fetchVideoStream, stopVideoStream, error: camError } = useVideo();
    const huddleKey = process.env.NEXT_PUBLIC_HUDDLE_KEY;
    const {roomid} = router.query;
    useEffect(() => {
        // its preferable to use env vars to store projectId
        if (typeof huddleKey == "string")
            {
                console.log(huddleKey);
                initialize(huddleKey);}
    }, []);
    useEffect(() => {
        toast("Wow so easy!", {
            toastId: 'test',
        });

        if (typeof router.query.roomid == "string") {
            console.log(router.query.roomid);
            setroomId(router.query.roomid);
            // if(isInitialized)
            // joinLobby(router.query.roomid);
        }
    }, [router.isReady])

    // EVENT LISTENERS FOR HUDDLE
    useEventListener("lobby:joined", () => {
        // Write your logic here
        console.log("lobby:joined")
        toast("Joined the Lobby", {
            toastId: 'l1',
        })
    })
    //IF LOBBY JOINING FAILED
    useEventListener("lobby:failed", () => {
        // Write your logic here
        console.log("lobby:failed")
        toast("Failed To Join the Lobby", {
            toastId: 'l2',
        })
    })

    //CAMERA IS TURNED ON
    useEventListener("lobby:cam-on", () => {
        // Write your logic here
        console.log("lobby:cam-on")
        toast("Camera is Turned On", {
            toastId: 'l3',
        })
    })
    //CAMERA IS TURNED OFF
    useEventListener("lobby:cam-off", () => {
        // Write your logic here
        console.log("obby:cam-off")
        toast("Camera Turned Off", {
            toastId: 'l4',
        })
    })
    //MIC IS TURNED ON
    useEventListener("lobby:mic-on", () => {
        // Write your logic here
        console.log("lobby:mic-on")
        toast("MIC Turned ON", {
            toastId: 'l5',
        })
    })
    //MIC IS TURNED OFF
    useEventListener("lobby:mic-off", () => {
        // Write your logic here
        console.log("lobby:mic-off")
        toast("MIC Turned OFF", {
            toastId: 'l6',
        })
    })
    //JOINING ROOM
    useEventListener("room:joined", () => {
        // Write your logic here
        console.log("room:joined")
        toast("Room Joined", {
            toastId: 'l7',
        })
    })
    //FAILED TO JOIN ROOM
    useEventListener("room:failed", () => {
        // Write your logic here
        console.log("Failed to Join Room")
        toast("Room Joined", {
            toastId: 'l8',
        })
    })
    //START MEET RECORD
    useEventListener("room:recording-started", () => {
        // Write your logic here
        console.log("room:recording-started")
        toast("Started the recording of this meet", {
            toastId: 'l9',
        })
    })
    //STOP MEET RECORD
    useEventListener("room:recording-stopped", () => {
        // Write your logic here
        console.log("room:recording-stopped")
        toast("Stopped the recording of this meet", {
            toastId: 'l9',
        })
    })

    return (
        <div>
            <Navbar />
            {isInitialized ? 'Hello World!' : 'Please initialize'}
            {/* <div>{isInitialized ? 'Hello World!' : 'Please initialize'}
                <button disabled={!joinLobby.isCallable} onClick={() => {
                    console.log(router.query.roomid);
                    try {
                        if (typeof router.query.roomid == "string")
                        {
                            console.log(router.query.roomid);
                            
                            joinLobby(router.query.roomid);}
                    } catch (error) {
                        console.log(error);
                    }
                }}>
                    Join Lobby
                </button>
                <button disabled={!fetchAudioStream.isCallable} onClick={fetchAudioStream}>
                    FETCH_AUDIO_STREAM
                </button>

                <button disabled={!fetchVideoStream.isCallable} onClick={fetchVideoStream}>
                    FETCH_VIDEO_STREAM
                </button> */}
            <div className={styles.recordOuter}>
                <div className={styles.smallHeader}>
                    <div className={styles.goBack}>
                        <Link href="/app/createnews">
                            &#60; Go Back
                        </Link>
                    </div>
                    <div className={styles.heading}>
                        Record Your Video
                    </div>
                    <div className={styles.extra}>

                    </div>
                </div>

                <div className={styles.recordWrapper}>
                    <div className={styles.recordScreen}>

                    </div>
                    <div className={styles.button}>
                        <button onClick={e=>{
                           console.log(roomid);
                           //@ts-ignore
                            joinLobby(roomid)
                        }}>
                            Join Lobby
                        </button>
                        <button>
                            Start Recording 
                            <Image src={record} alt="Start Recording" />
                        </button>
                        <button>
                        Start Recording 
                            <Image src={Camera} alt="Start Camera" />
                        </button>
                        <button>
                        Start Recording 
                            <Image src={mic} alt="Start Recording" />
                        </button>
                        <button>
                        Start Recording 
                            <Image src={exit} alt="Start Recording" />
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default index