import React from 'react'
import Navbar from './components/LandingPage/Navbar'
import HeroText from "./components/LandingPage/Landing";
import AboutUs from "./components/About/Index";
const Landing = () => {
  return (
    <div className='LandingWrapper'>
        <Navbar />
      <HeroText />
      <AboutUs />
      {/* <Footer /> */}
    </div>
  )
}

export default Landing