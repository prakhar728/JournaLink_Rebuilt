import React from 'react'
import "./Landing.css";
import live from "../../assets/giphy.gif";
import Rotating from "../../assets/Rotating.png";
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <div className={ "landingWrapper"}>
            <div className={ "landingUpper1"}>
                <img src={live} alt=" " />
            </div>
            <div className={ "landingUpper2"}>
                <h1>&quot;Breaking Boundaries, Forging Connections&quot;.
                </h1>
                <h2>&quot;The JournaLink Unleashes the Power of Global News!&quot;</h2>
            </div>
            <div className={ "landingUpper3"}>
                <div className={ "landingLeft"}>
                    <p>
                    Welcome to Journal Link, where the world&apos;s stories come alive. Our platform connects journalists from every corner of the globe, empowering them to go live and deliver real-time news coverage like never before. Witness breaking news unfold as it happens, gaining a global perspective from the comfort of your screen.
                    </p>
                </div>
                <div className={ "landingRight"}>
                    <div className={ "rotating"}>
                        <img src={'https://upload.wikimedia.org/wikipedia/commons/7/7f/Rotating_earth_animated_transparent.gif'} alt="Rotating Earth " width={300} height={400}/>
                    </div>
                </div>
            </div>
            <div className={ "landingUpper4"}>
                <Link to="/app/explore"><button>Explore</button></Link>
            </div>
        </div>
    )
}

export default Landing