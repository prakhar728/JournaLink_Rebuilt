import React from 'react'
import "./About.css";
import Gradient from "../../assets/Gradient.svg"
const Index = () => {
    return (
        <div className={"aboutWrapper"}>
            
            <p className={"aboutHeading"}>About Us</p>
            <div className={"mainAbout"}>
                <div className={"AboutLeft"}>
                    <img src={Gradient} alt="Logo on phone" />
                </div>
                <div className={"AboutRight"}>
                    <div className={"rightContentAbout"}>
                        <p className={"contentHeadingAbout"}>
                        At JournaLink, we are reimagining the landscape of journalism.
                        </p>
                        <p className={"contentDescriptionAbout"}>
                        Join us to revolutionize news consumption and creation. Contribute data, publish content, and engage with a vibrant community. Together, let&apos;s shape the future of journalism.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index