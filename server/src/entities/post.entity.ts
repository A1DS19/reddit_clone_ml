import { Exclude } from 'class-transformer';
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
import { Community } from './community.entity';
import { IsActive } from './enums';
import { Reply } from './reply.entity';
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  body: string;

  @Column({ type: 'varchar', nullable: true, array: true })
  imagesUrl: string[];

  @Column({ type: 'enum', enum: IsActive, default: IsActive.ACTIVE })
  isActive: IsActive;

  @Column()
  @Exclude()
  communityId: number;

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Reply, (reply) => reply.post)
  replies: Reply[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
