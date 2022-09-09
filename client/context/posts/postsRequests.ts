import { ICreatePostInitialValues } from '@/components/posts/create/CreatePostTabPanel';
import { axiosInstance } from 'config/axios';
import { PostResponse } from 'types/posts';

export const getAllPostsByCommunitySlug = async (
  slug: string,
  userId: string
): Promise<PostResponse[]> => {
  const { data } = await axiosInstance.get(`/posts/${slug}?userId=${userId}`, {
    withCredentials: true,
  });
  return data;
};

export const getAllPostsHome = async (userId: string): Promise<PostResponse[]> => {
  const { data } = await axiosInstance.get(`/posts/get-all?userId=${userId}`, {
    withCredentials: true,
  });
  return data;
};

export const getPostById = async (postId: number): Promise<PostResponse> => {
  const { data } = await axiosInstance.get(`/posts/get-by-id/${postId}`, {
    withCredentials: true,
  });
  return data;
};

export const getVoteCountForPostId = async (postId: number): Promise<number> => {
  const { data } = await axiosInstance.get(`/votes/${postId}`, {
    withCredentials: true,
  });
  return data;
};

export const updatePostVoteForPostId = async (postId: number, value: number) => {
  const { data } = await axiosInstance.put(
    `/votes/update-post-vote/${postId}?value=${value}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const createPost = async (
  body: Partial<ICreatePostInitialValues>,
  communityId: number
) => {
  const { data } = await axiosInstance.post(
    '/posts/create',
    { ...body, communityId },
    { withCredentials: true }
  );
  return data;
};

export const getPostBySlug = async (
  slug: string,
  userId: string
): Promise<PostResponse> => {
  const { data } = await axiosInstance.get(
    `/posts/get-by-slug/${slug}?userId=${userId}`,
    { withCredentials: true }
  );
  return data;
};

export const createComment = async (body: string, postId: number) => {
  const { data } = await axiosInstance.post(
    `/comments/create?postId=${postId}`,
    { body },
    { withCredentials: true }
  );
  return data;
};
