import Head from 'next/head';
import { NextPage } from 'next';
import Navbar from '../components/LandingPage/Navbar';
import Landing from '../components/LandingPage/Landing';
import AboutUs from "../components/About/Index";
import Sponsor from "../components/Sponsors/Index";
import Footer from '../components/Footer/Footer';
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>JournaLink</title>
        <meta
          content="Decentralized News for everyone"
          name="Decentralized News for everyone"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Navbar />
      <Landing />
      <AboutUs />
      <Sponsor />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
