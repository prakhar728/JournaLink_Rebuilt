import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import logo from '../assets/Logo.png';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import profile from "../assets/ProfileIcon.svg";
import { useAccount } from 'wagmi';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const {address} = useAccount();
  const [first, setfirst] = useState<String>("");
  useEffect(() => {

    if(typeof window !=="undefined"){
      if(typeof address=="string")
      setfirst(address)
    }
  }, [address])
  
  return (
    <div className={"navbarWrapper"}>
      <div>
        <img src={logo} alt="Logo" onClick={e=>{
        }}/>
      </div>
      <div className={"profileHolder"}>
      <ConnectButton />
      {first && <Link to={`/app/profile?address=${first}`}><img src={profile} alt="Profile" /></Link>}
      </div>
    </div>
  )
}

export default Navbar