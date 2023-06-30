import React from 'react'
import "./Sponsor.css";
import huddle from "../../assets/Huddle1.png";
import lighthouse from "../../assets/Lighthouse1.png";
import ens from "../../assets/ENS.png";
import fvm from "../../assets/Filecoin.png";
import tableland from "../../assets/Tableland.png";
const Index = () => {
  return (
    <div className={"sponsorWrapper"}>
        <div className={"heading"}>
            <p>Our Sponsors</p>
        </div>
        <div className={
            "sponsorList"
        }>
            <div className={"sponsorupper"}>
                <div className={"type1"}>
                    <img src={huddle} alt="Huddle01" />
                </div>
                <div className={"type2"}>
                <img src={fvm} alt="Huddle01" />

                </div>
                <div className={"type1"}>
                <img src={lighthouse} alt="Huddle01" />

                </div>
            </div>
            <div className={"sponsorlower"}>
                <div className={"type3"}>
                <img src={ens} alt="Huddle01" />

                </div>
                <div className={"type3"}>
                <img src={tableland} alt="Huddle01" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Index