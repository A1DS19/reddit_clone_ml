import { Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/header/Header';

const Home: NextPage = () => {
  return (
    <div className='bg-gray-300'>
      <Head>
        <title>Reddit - Dive into anything</title>
        <meta name='description' content='Reddit clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Header />
      </main>
    </div>
  );
};

export default Home;
