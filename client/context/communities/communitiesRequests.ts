import { axiosInstance } from 'config/axios';
import {
  Community,
  CommunityResponse,
  CreateCommunityValues,
  JoinedCommunities,
} from 'types/communities';

export const getJoinedCommunities = async (): Promise<JoinedCommunities[]> => {
  const { data } = await axiosInstance.get('/communities/joined-communities', {
    withCredentials: true,
  });
  return data;
};

export const getJoinedCommunitiesFilter = async (
  communityName: string
): Promise<JoinedCommunities[]> => {
  const { data } = await axiosInstance.get(
    `/communities/joined-communities-filter/${communityName}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const createCommunity = async (
  body: CreateCommunityValues
): Promise<Community> => {
  const { data } = await axiosInstance.post('/communities/create', body, {
    withCredentials: true,
  });
  return data;
};

export const getCommunityBySlug = async (
  slug: string,
  userId: string
): Promise<CommunityResponse> => {
  const { data } = await axiosInstance.get(
    `/communities/community/${slug}?userId=${userId}`,
    {
      withCredentials: true,
    }
  );
  return data;
};
