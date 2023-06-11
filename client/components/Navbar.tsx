import React from 'react'
import styles from "./Navbar.module.css";
import Image from 'next/image';
import logo from '../assets/Logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import profile from "../assets/ProfileIcon.svg";
const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <div>
        <Image src={logo} alt="Logo"/>
      </div>
      <div className={styles.profileHolder}>
      <ConnectButton />
      <Link href={'/app/Profile'}><Image src={profile} alt="Profile" /></Link>
      </div>
    </div>
  )
}

export default Navbar