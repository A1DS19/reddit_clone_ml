import { Box } from '@chakra-ui/react';
import React from 'react';
import { PostResponse } from 'types/posts';
import { Post } from './Post';

interface PostListProps {
  posts: PostResponse[];
}

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  if (!posts) {
    return <React.Fragment></React.Fragment>;
  }

  const renderCommunityPosts = () => {
    return posts?.map((post) => {
      return <Post key={post.id} post={post} isFromList={true} />;
    });
  };

  return (
    <Box overflowY='scroll' maxH='80vh'>
      {renderCommunityPosts()}
    </Box>
  );
};
