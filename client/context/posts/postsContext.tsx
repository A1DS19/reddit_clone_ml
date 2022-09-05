import React from 'react';
import { PostResponse } from 'types/posts';
import { ReactFCWithChildren } from 'types/shared';

export interface IPostsContext {
  errorMessage: string | null;
  setErrorMessage: (error: string | null) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
  posts: PostResponse[];
  setPosts: React.Dispatch<React.SetStateAction<PostResponse[]>>;
}

export const PostsContext = React.createContext<IPostsContext | false>(false);

export const PostsProvider: ReactFCWithChildren = ({ children }) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [posts, setPosts] = React.useState<PostResponse[]>([]);

  const values: IPostsContext = {
    errorMessage,
    setErrorMessage,
    loading,
    setLoading,
    posts,
    setPosts,
  };

  return <PostsContext.Provider value={values}>{children}</PostsContext.Provider>;
};
