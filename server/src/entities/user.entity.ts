import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Post } from './post.entity';
import { Vote } from './vote.entity';
import { Comment } from './comment.entity';
import { Reply } from './reply.entity';
import { IsActive } from './enums';
import { Community } from './community.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Exclude()
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: IsActive, default: IsActive.ACTIVE })
  @Exclude()
  isActive: IsActive;

  @Column({ nullable: true })
  session_expiration_time: Date;

  @OneToMany(() => Community, (community) => community.creator)
  myCommunities: Community[];

  @OneToMany(() => Community, (community) => community.members)
  joinedCommunities: Community[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  @CreateDateColumn()
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn()
  @Exclude()
  updatedAt: Date;
}
