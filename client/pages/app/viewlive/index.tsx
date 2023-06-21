import React, {useEffect, useRef, useState} from "react";

import {Audio, Video} from "@huddle01/react/components";
import styles from "./View.module.css";
import {usePeers} from "@huddle01/react/hooks";
import {useRecorder} from "@huddle01/react/app-utils";
import {useRouter} from "next/router";

const App = () => {
    const router = useRouter();

    const [roomId, setRoomId] = useState(router.query.roomid?.toString() || "");
    console.log(router.query);

    const {peers} = usePeers();

    useEffect(() => {
        setRoomId(router.query.roomid?.toString() || "");
    }, [router.query.roomid]);
    useRecorder(roomId, process.env.NEXT_PUBLIC_HUDDLE_KEY || "");


    return (
        <div  >
            <div >
                <div className={styles.videoMain}>
                    {Object.values(peers)
                        .filter((peer) => peer.cam)
                        .map((peer) => (
                            <Video
                                key={peer.peerId}
                                peerId={peer.peerId}
                                track={peer.cam}
                                // debug
                                id="videoStreamBot"
                            />
                        ))}
                    {Object.values(peers)
                        .filter((peer) => peer.mic)
                        .map((peer) => (
                            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic}/>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default App;