import { UserResponse } from './auth';
import { PostResponse } from './posts';

export enum IsActive {
  ACTIVE = 1,
  UNACTIVE = 0,
}

export enum CommunityRestrictions {
  PUBLIC = 1,
  RESTRICTED = 0,
  PRIVATE = -1,
}

export type IsActiveType = IsActive;
export type CommunityRestrictionsTypes = CommunityRestrictions;

export interface Community extends JoinedCommunities {
  creator?: UserResponse;
  members?: UserResponse[];
}

export interface JoinedCommunities {
  id: number;
  name: string;
  slug: string;
  about: string;
  profile_pic_url: string;
  header_pic_url: string;
  isActive: IsActive;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommunityValues {
  name: string;
}

export interface CommunityResponse {
  id: number;
  name: string;
  slug: string;
  profile_pic_url: string;
  header_pic_url: string;
  about: string;
  isActive: IsActiveType;
  createdAt: Date;
  updatedAt: Date;
  creator: UserResponse;
  members: UserResponse[];
  memberCount: number;
}
