import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { Reply } from './reply.entity';
import { User } from './user.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  vote_type: number;

  @Column()
  @Exclude()
  userId: number;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Column({ nullable: true })
  @Exclude()
  postId: number;

  @Column({ nullable: true })
  @Exclude()
  replyId: number;

  @Column({ nullable: true })
  @Exclude()
  commentId: number;

  @ManyToOne(() => Post, (post) => post.votes)
  post: Vote;

  @ManyToOne(() => Reply, (reply) => reply.votes)
  reply: Reply;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  comment: Comment;

  @CreateDateColumn()
  createdAt: Date;
}
