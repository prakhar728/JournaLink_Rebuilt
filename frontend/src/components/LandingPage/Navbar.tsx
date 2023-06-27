import React from 'react'
import  "./LandingNav.css";
import logo from "../../assets/Logo.png";
import Frame from "../../assets/NavFrame.svg"
import profileIcon from "../../assets/ProfileIcon.svg";
import dots from "../../assets/Dots.svg";
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className={ "navWrapper"}>
            <div className={ "upper1"}>
                <div className={ "e1"}>
                    <img src={logo} alt="Journalink logo" />
                </div>

                <div className={ "e2"}>

                    <img src={Frame} alt="Frame" />
                </div>
                <div className={ "walletAndProfile"}>
                    <Link to="/app/profile"><img src={profileIcon} alt="Go to your profile" />
                    </Link>
                </div>
            </div>
            <div className={ "upper2"}>
                <img src={dots} alt="" />
                <h1>The JournaLink</h1>
                <img src={dots} alt="" />

            </div>
            <div className={ "upper3"}>
                <div className={ "links"}>
                    <Link to="/">Home</Link>
                    <Link to="/">About Us</Link>
                    <div className={ "dropDown"}>
                        <Link to="/">Dashboard</Link>
                        <div className={ "dropdown_content"}>
                                <Link to="/app/explore">Dao</Link>
                                <Link to="/app/news">News</Link>
                        </div>
                    </div>
                    <Link to="/">Profile</Link>
                    <Link to="/">Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar