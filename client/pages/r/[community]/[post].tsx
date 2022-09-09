import type { GetServerSideProps, NextPage } from 'next';
import { SelectedPostIndex } from '@/components/posts/selectedPostPage/SelectedPostIndex';
import { getPostBySlug } from 'context/posts/postsRequests';
import { PostResponse } from 'types/posts';
import React from 'react';
import { useRouter } from 'next/router';
import { AuthContext, AuthContextType } from 'context/auth/authContext';
import { IPostsContext, PostsContext } from 'context/posts/postsContext';

interface ServerSideResponse {
  post: PostResponse;
  errorMessage: string;
}

const SelectedPost: NextPage<ServerSideResponse> = ({ errorMessage, post }) => {
  const { user } = React.useContext(AuthContext) as AuthContextType;
  const { setPost, post: postState } = React.useContext(PostsContext) as IPostsContext;
  const router = useRouter();

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
    if (post) {
      setPost(post);
    }
  }, []);

  if (!post || errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return <SelectedPostIndex post={postState!} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postSlug = context.query.post;
  const userId = context.query.userId;

  let post = {};
  let errorMessage = '';

  try {
    const data = await getPostBySlug(postSlug as string, userId as string);
    post = data;
  } catch (error: any) {
    errorMessage = error.response.data.message;
  }

  return {
    props: {
      post,
      errorMessage,
    },
  };
};

export default SelectedPost;
