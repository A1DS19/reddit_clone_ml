import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { IsActive } from './enums';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Reply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ type: 'enum', enum: IsActive, default: IsActive.ACTIVE })
  isActive: IsActive;

  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  @ManyToOne(() => Post, (post) => post.replies)
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.replies)
  comment: Comment;

  @OneToMany(() => Vote, (vote) => vote.reply)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
