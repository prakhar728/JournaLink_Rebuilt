import React from 'react'
import styles from "./LandingNav.module.css";
import Image from 'next/image';
import logo from "../../assets/Logo.png";
import Frame from "../../assets/NavFrame.svg"
import { ConnectButton } from '@rainbow-me/rainbowkit';
import profileIcon from "../../assets/ProfileIcon.svg";
import Link from 'next/link';
import dots from "../../assets/Dots.svg";
const Navbar = () => {
  return (
    <div className={styles.navWrapper}>
        <div className={styles.upper1}>
            <div  className={styles.e1}>
            <Image src={logo} alt="Journalink logo"/>
            </div>
            
            <div className={styles.e2}>

            <Image src={Frame} alt="Frame" />
            </div>
            <div className={styles.walletAndProfile}>
            <ConnectButton />
            <Link href="/app/profile"><Image src={profileIcon} alt="Go to your profile" />
            </Link>
            </div>
        </div>
        <div className={styles.upper2}>
            <Image src={dots} alt="" />
            <h1>The JournaLink</h1>
            <Image src={dots} alt="" />

        </div>
        <div className={styles.upper3}>
            <div className={styles.links}>
                <Link href="/">Home</Link>
                <Link href="/">About Us</Link>
                <Link href="/">Dashboard</Link>
                <Link href="/">Profile</Link>
                <Link href="/">Contact Us</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar