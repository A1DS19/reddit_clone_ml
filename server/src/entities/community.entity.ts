import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsActive } from './enums';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Community {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  profile_pic_url: string;

  @Column({ nullable: true })
  header_pic_url: string;

  @Column({ nullable: true })
  about: string;

  @Column({ type: 'enum', enum: IsActive, default: IsActive.ACTIVE })
  isActive: IsActive;

  @ManyToOne(() => User, (user) => user.myCommunities)
  creator: User;

  @ManyToMany(() => User, (user) => user.joinedCommunities)
  @JoinTable()
  members: User[];

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
