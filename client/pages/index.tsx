import { CreatePostSubheader } from '@/components/posts/CreatePostSubheader';
import { FilterRelevance } from '@/components/posts/FilterRelevance';
import { PostIndex } from '@/components/posts/PostIndex';
import { Box, Container } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { IPostsContext, PostsContext } from 'context/posts/postsContext';
import { getAllPostsHome } from 'context/posts/postsRequests';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { PostResponse } from 'types/posts';

interface ServerResponse {
  posts: PostResponse[];
  errorMessage: string;
}

const Home: NextPage<ServerResponse> = ({ errorMessage, posts }) => {
  const { user, isAuth } = React.useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const { setSelectedCommunity, selectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;
  const { setPosts, posts: postsState } = React.useContext(PostsContext) as IPostsContext;

  React.useEffect(() => {
    setSelectedCommunity(null);
  }, []);

  React.useEffect(() => {
    router.query.userId = user?.id.toString() || '-1';
    router.push(router);
  }, [isAuth]);

  React.useEffect(() => {
    setPosts(posts);
  }, [posts]);

  if (errorMessage) {
    return <div></div>;
  }

  return (
    <div>
      <Head>
        <title>Reddit - Dive into anything</title>
        <meta name='description' content='Reddit clone' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container maxW='4xl'>
          {isAuth && (
            <Box position='relative' top={5}>
              <CreatePostSubheader selectedCommunity={null} />
            </Box>
          )}

          <Box
            mt={!isAuth ? 8 : 10}
            mb={!isAuth ? 10 : 5}
            position={!isAuth ? 'relative' : '-moz-initial'}
            top={!isAuth ? 5 : 0}
          >
            <FilterRelevance />
          </Box>
          <Box my={5}>
            <PostIndex posts={postsState} />
          </Box>
        </Container>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId;

  let posts: PostResponse[] = [];
  let errorMessage = '';

  try {
    const data = await getAllPostsHome(userId as string);
    posts = data;
  } catch (error: any) {
    errorMessage = error.response.data.message;
  }

  return {
    props: {
      posts,
      errorMessage,
    },
  };
};

export default Home;
