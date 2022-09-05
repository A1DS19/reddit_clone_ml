import { CreatePostSubheader } from '@/components/posts/CreatePostSubheader';
import { FilterRelevance } from '@/components/posts/FilterRelevance';
import { PostIndex } from '@/components/posts/PostIndex';
import { Header } from '@/components/posts/postPage/Header';
import { Box, Container } from '@chakra-ui/react';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import { getCommunityBySlug } from 'context/communities/communitiesRequests';
import { IPostsContext, PostsContext } from 'context/posts/postsContext';
import { getAllPostsByCommunitySlug } from 'context/posts/postsRequests';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { CommunityResponse } from 'types/communities';
import { PostResponse } from 'types/posts';

interface ServerSideResponse {
  community: CommunityResponse;
  posts: PostResponse[];
  errorMessage: string;
}

const Community: NextPage<ServerSideResponse> = ({ community, posts, errorMessage }) => {
  const { user, isAuth } = React.useContext(AuthContext) as AuthContextType;
  const router = useRouter();
  const { posts: postsState, setPosts } = React.useContext(PostsContext) as IPostsContext;
  const { selectedCommunity, setSelectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;

  React.useEffect(() => {
    if (!user) {
      router.query.userId = '-1';
      router.push(router);
    } else {
      router.query.userId = user.id.toString();
      router.push(router);
    }
  }, [user]);

  React.useEffect(() => {
    setSelectedCommunity(community);
    setPosts(posts);
  }, [community, setSelectedCommunity, posts, setPosts]);

  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <React.Fragment>
      <Header selectedCommunity={selectedCommunity!} />
      <Container maxW='4xl'>
        <Box my={5}>
          {isAuth && <CreatePostSubheader selectedCommunity={selectedCommunity!} />}
        </Box>
        <Box>
          <FilterRelevance selectedCommunity={selectedCommunity!} />
        </Box>
        <Box my={5}>
          <PostIndex selectedCommunity={selectedCommunity!} posts={postsState} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const communitySlug = context.query.community;
  const userId = context.query.userId;

  let community = {};
  let posts = {};
  let errorMessage = '';

  try {
    community = await getCommunityBySlug(communitySlug as string, userId as string);
    posts = await getAllPostsByCommunitySlug(communitySlug as string, userId as string);
  } catch (error: any) {
    errorMessage = error.response.data.message;
  }

  return {
    props: {
      community,
      posts,
      errorMessage,
    },
  };
};

export default Community;
