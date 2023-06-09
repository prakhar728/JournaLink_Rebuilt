import Head from 'next/head';
import { NextPage } from 'next';

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

      Hello
    </div>
  );
};

export default Home;
