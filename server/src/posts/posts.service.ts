import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dtos/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  async createPost(
    { title, body, imagesUrl, communityId }: CreatePostDto,
    user: User,
  ): Promise<Post> {
    const post = await this.postsRepository.create({
      title,
      body,
      imagesUrl,
      user,
      communityId,
    });

    return await this.postsRepository.save(post);
  }

  async getAllPostsByCommunitySlug(
    slug: string,
    userId: number,
  ): Promise<Post[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'post_creator')
      .leftJoin('posts.community', 'community')
      .leftJoinAndSelect('posts.votes', 'votes', 'votes.user.id =:userId', {
        userId,
      })
      .loadRelationCountAndMap('posts.commentCount', 'posts.comments')
      .where('community.slug = :slug', { slug })
      .getMany();

    if (!posts) {
      throw new NotFoundException('no posts');
    }

    return posts;
  }

  async getPostById(postId: number, user: User): Promise<Post> {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'post_creator')
      .leftJoin('posts.community', 'community')
      .leftJoinAndSelect('posts.votes', 'votes', 'votes.user.id =:userId', {
        userId: user.id,
      })
      .loadRelationCountAndMap('posts.commentCount', 'posts.comments')
      .where('posts.id = :postId', { postId })
      .getOne();

    if (!post) {
      throw new NotFoundException('no posts');
    }

    return post;
  }
}
