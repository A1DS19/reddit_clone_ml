import { Box } from '@chakra-ui/react';
import React from 'react';
import { CommunityResponse } from 'types/communities';
import { PostResponse } from 'types/posts';
import { PostList } from './PostList';

interface PostIndexProps {
  selectedCommunity?: CommunityResponse;
  posts: PostResponse[];
}

export const PostIndex: React.FC<PostIndexProps> = ({ posts }) => {
  return <PostList posts={posts} />;
};
