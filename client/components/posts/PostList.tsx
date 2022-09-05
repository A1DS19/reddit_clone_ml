import { Box } from '@chakra-ui/react';
import React from 'react';
import { CommunityResponse } from 'types/communities';
import { PostResponse } from 'types/posts';
import { Post } from './Post';

interface PostListProps {
  selectedCommunity: CommunityResponse;
  posts: PostResponse[];
}

export const PostList: React.FC<PostListProps> = ({ selectedCommunity, posts }) => {
  const renderCommunityPosts = () => {
    if (posts?.length === 0) {
      return <React.Fragment></React.Fragment>;
    }

    return posts?.map((post) => {
      return <Post key={post.id} post={post} selectedCommunity={selectedCommunity} />;
    });
  };

  return (
    <Box overflowY='scroll' maxH='70vh'>
      {renderCommunityPosts()}
    </Box>
  );
};
