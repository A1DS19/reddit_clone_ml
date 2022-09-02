import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsActive } from './enums';
import { Post } from './post.entity';
import { Reply } from './reply.entity';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ type: 'enum', enum: IsActive, default: IsActive.ACTIVE })
  isActive: IsActive;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @OneToMany(() => Reply, (reply) => reply.comment)
  replies: Reply[];

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
