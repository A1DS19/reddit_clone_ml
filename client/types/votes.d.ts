export enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}
export interface IVote {
  id: number;
  vote_type: VoteType;
}
