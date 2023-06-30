import React from 'react'
import  "./Footer.css";
import shape from "../../assets/Shape.png";
const Footer = () => {
  return (
    <div className={"FooterWrapper"}>
        <div className={"shapeWrapper"}>

        <img src={shape} alt="Footer shape" />
        </div>
        <div className={"content"}>
            Random Bullshit
        </div>
    </div>
  )
}

export default Footer