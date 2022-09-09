import { Box, Button, ButtonGroup, Container, IconButton } from '@chakra-ui/react';
import { CommunitiesContext } from 'context/communities/communitiesContext';
import React from 'react';
import { PostResponse } from 'types/posts';
import { Header } from '@/components/posts/postPage/Header';
import { Post } from '../Post';
import { CreateComment } from './CreateComment';
import NonSSRWrapper from '@/components/common/NonSSRWrapper';
import { RenderComments } from './RenderComments';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextType } from 'context/auth/authContext';

interface SelectedPostIndexProps {
  post: PostResponse;
}

export const SelectedPostIndex: React.FC<SelectedPostIndexProps> = ({ post }) => {
  const router = useRouter();
  const { user } = React.useContext(AuthContext) as AuthContextType;
  const { selectedCommunity } = React.useContext(
    CommunitiesContext
  ) as CommunitiesContext;

  if (!post) {
    return <div></div>;
  }

  return (
    <React.Fragment>
      <Header
        selectedCommunity={selectedCommunity! || post.community}
        isFromList={false}
      />
      <Container maxW='6xl'>
        <Box my={5}>
          <ButtonGroup
            onClick={() => router.back()}
            mb={3}
            size='sm'
            isAttached
            color='white'
          >
            <IconButton
              _hover={{ bgColor: '' }}
              bgColor='blue.500'
              aria-label='Go back'
              icon={<ArrowBackIcon />}
            />
            <Button _hover={{ bgColor: '' }} bgColor='blue.500'>
              Go back
            </Button>
          </ButtonGroup>

          <Post post={post} isFromList={false} />
        </Box>

        <Box>
          <NonSSRWrapper>
            <CreateComment />
          </NonSSRWrapper>
        </Box>

        <Box my={5}>
          <RenderComments post={post} />
        </Box>
      </Container>
    </React.Fragment>
  );
};
