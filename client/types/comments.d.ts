import { UserResponse } from './auth';

export interface IComments {
  id: number;
  body: string;
  user: UserResponse;
  replies: IComments[];
  createdAt: string;
}
