import React from 'react'
import Navbar from './components/LandingPage/Navbar'
import HeroText from "./components/LandingPage/Landing";
const Landing = () => {
  return (
    <div className='LandingWrapper'>
        <Navbar />
      <HeroText />
      {/* <AboutUs /> */}
      {/* <Sponsor /> */}
      {/* <Footer /> */}
    </div>
  )
}

export default Landing