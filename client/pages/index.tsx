import Head from 'next/head';
import { NextPage } from 'next';
import Navbar from '../components/LandingPage/Navbar';
import Landing from '../components/LandingPage/Landing';
import newspaper from "../assets/newspaper.svg";
import Image from 'next/image';
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
    </div>
  );
};

export default Home;
