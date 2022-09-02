import { PostIndex } from '@/components/posts/PostIndex';
import { Box, Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Reddit - Dive into anything</title>
        <meta name='description' content='Reddit clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container maxW='4xl'>
          <Box my={5}>
            {/* <CreatePostSubheader selectedCommunity={selectedCommunity!} /> */}
          </Box>
          <Box>{/* <FilterRelevance selectedCommunity={selectedCommunity!} /> */}</Box>
          <Box my={5}>{/* {posts} */}</Box>
        </Container>
      </main>
    </div>
  );
};

export default Home;
