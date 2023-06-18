import React, { useEffect, useState } from 'react'
import styles from "./Navbar.module.css";
import Image from 'next/image';
import logo from '../assets/Logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import profile from "../assets/ProfileIcon.svg";
import { useAccount } from 'wagmi';
import { useRouter } from 'next/router';
const Navbar = () => {
  const {address} = useAccount();
  const router  = useRouter();
  const [first, setfirst] = useState("");
  useEffect(() => {
    if(router.isReady)
    if(typeof address=="string")
    setfirst(address)
  }, [router.isReady])
  
  return (
    <div className={styles.navbarWrapper}>
      <div>
        <Image src={logo} alt="Logo" onClick={e=>{
          router.push("/");
        }}/>
      </div>
      <div className={styles.profileHolder}>
      <ConnectButton />
      {first && <Link href={`/app/profile?address=${first}`}><Image src={profile} alt="Profile" /></Link>}
      </div>
    </div>
  )
}

export default Navbar