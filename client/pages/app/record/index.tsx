import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../../components/Navbar'
import { useEventListener, useHuddle01 } from '@huddle01/react';
import { useIsMounted } from '../../../hooks/useIsMounted';
import { useAudio, useLobby, useRecording, useRoom, useVideo } from '@huddle01/react/hooks';
import { useRouter } from 'next/router';
import styles from "./Record.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import record from "../../../assets/Record.png";
import Camera from "../../../assets/Camera.png";
import mic from "../../../assets/Mic.png";
import exit from "../../../assets/exit.png";
import { Audio, Video } from '@huddle01/react/components';
import Image from 'next/image';
const Index = () => {
    const { initialize, isInitialized } = useHuddle01();
    const { joinLobby, isLobbyJoined, error } = useLobby();
    const videoRef = useRef<HTMLVideoElement>(null);
    const { stream: videoStream } = useVideo();
    const { stream: audioStream } = useAudio();
    const router = useRouter()
    const mounted = useIsMounted();
    const [roomId, setroomId] = useState("");
    const { fetchAudioStream, stopAudioStream, error: micError,produceAudio, stopProducingAudio  } = useAudio();
    const { fetchVideoStream, stopVideoStream, error: camError , produceVideo, stopProducingVideo } = useVideo();
    const {
        startRecording,
        stopRecording,
        isStarting,
        inProgress,
        isStopping,
        error: RecordingError,
        data: recordingData,
    } = useRecording();
    const { joinRoom, leaveRoom } = useRoom();
    const { roomid } = router.query;

    useEffect(() => {
        toast("Wow so easy!", {
            toastId: 'test',
        });
    const huddleKey = process.env.NEXT_PUBLIC_HUDDLE_KEY;

        if (typeof router.query.roomid == "string") {
            if (typeof huddleKey == "string") {
                console.log(huddleKey);
                initialize(huddleKey);
            }

            console.log(router.query.roomid);
            setroomId(router.query.roomid);
            // if(isInitialized)
            // joinLobby(router.query.roomid);
        }
    }, [router.isReady,initialize,router.query.roomid])

    //AUTOMATIC LOBBY JOIN
    useEffect(() => {
        if (isInitialized)
            //@ts-ignore
            joinLobby(roomid)
    }, [isInitialized,joinLobby,roomid])

    //FETCH VIDEO STREAM
    useEffect(() => {
        if (fetchVideoStream.isCallable == true)
            fetchVideoStream();

    }, [fetchVideoStream])

    //FETCH AUDIO STREAM
    useEffect(() => {
        if (fetchAudioStream.isCallable == true)
            fetchAudioStream();

    }, [fetchAudioStream])


    // JOIN ROOM AUTOMATICALLY
  

 
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
        if (videoStream && videoRef.current) 
        videoRef.current.srcObject = videoStream;
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
        });
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
        console.log(recordingData);
        localStorage.setItem("recordingData", JSON.stringify(recordingData));
        // Write your logic here
        console.log("room:recording-stopped")
        toast("Stopped the recording of this meet", {
            toastId: 'l9',
        })
        setTimeout(() => {
            router.push("/app/createnews")
        }, 3000)
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
                    <video ref={videoRef} autoPlay muted id="videoStream"></video>
                    </div>
                    <div className={styles.button}>
                    <button onClick={joinRoom}>
                            Join Room
                            <Image src={record} alt="Start Recording" />
                        </button>
                        <button onClick={e=>produceVideo(videoStream)}>
                            Start Camera
                            <Image src={Camera} alt="Start Camera" />
                        </button>
                        <button onClick={e=>produceVideo(audioStream)} >
                            Start Mic
                            <Image src={mic} alt="Start Mic" />
                        </button>
                        <button onClick={() => {
                                console.log(`${process.env.NEXT_PUBLIC_BASE_URL}app/rec?roomId=${roomid}`);
                                startRecording(`${process.env.NEXT_PUBLIC_BASE_URL}app/rec?roomId=${roomid}`)
                            }}>
                            Start Recording
                            <Image src={record} alt="Start Recording" />
                        </button>
                        <button onClick={stopRecording}>
                            End Recording
                            <Image src={exit} alt="Start Recording" />
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Index