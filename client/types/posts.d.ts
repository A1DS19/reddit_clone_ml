import { UserResponse } from './auth';
import { IsActiveType } from './communities';
import { IVote } from './votes';

export interface PostResponse {
  title: string;
  body: string;
  user: UserResponse;
  imagesUrl: string[];
  id: number;
  isActive: IsActiveType;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  votes: IVote[];
}
