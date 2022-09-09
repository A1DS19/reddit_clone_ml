import { Comment } from 'src/entities/comment.entity';
import { Post } from 'src/entities/post.entity';

export type CreateCommentResponse = {
  comment: Comment;
  commentCount: Post;
};
