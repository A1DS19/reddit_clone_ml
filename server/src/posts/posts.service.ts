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
    const slug = title
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('_')
      .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

    const post = await this.postsRepository.create({
      title,
      body,
      imagesUrl,
      user,
      communityId,
      slug,
    });

    return await this.postsRepository.save(post);
  }

  async getAllPostsHome(userId: number): Promise<Post[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'post_creator')
      .leftJoinAndSelect('posts.community', 'community')
      .leftJoinAndSelect('community.members', 'members')
      .leftJoinAndSelect('posts.votes', 'votes', 'votes.user.id =:userId', {
        userId,
      })
      .loadRelationCountAndMap('posts.commentCount', 'posts.comments')
      .orderBy('posts.createdAt', 'DESC')
      .getMany();

    if (!posts) {
      throw new NotFoundException('no posts');
    }

    return posts;
  }

  async getAllPostsByCommunitySlug(
    slug: string,
    userId: number,
  ): Promise<Post[]> {
    const posts = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'post_creator')
      .leftJoinAndSelect('posts.community', 'community')
      .leftJoinAndSelect('community.members', 'members')
      .leftJoinAndSelect('posts.votes', 'votes', 'votes.user.id =:userId', {
        userId,
      })
      .loadRelationCountAndMap('posts.commentCount', 'posts.comments')
      .where('community.slug =:slug', { slug })
      .orderBy('posts.createdAt', 'DESC')
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
      .leftJoinAndSelect('posts.community', 'community')
      .leftJoinAndSelect('community.members', 'members')
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

  async getPostBySlug(postSlug: string, userId: number): Promise<Post> {
    const post = await this.postsRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.user', 'post_creator')
      .leftJoinAndSelect('posts.community', 'community')
      .leftJoinAndSelect('community.members', 'members')
      .leftJoinAndSelect('posts.votes', 'votes', 'votes.user.id =:userId', {
        userId,
      })
      .loadRelationCountAndMap('posts.commentCount', 'posts.comments')
      .leftJoinAndSelect('posts.comments', 'comments')
      .leftJoinAndSelect('comments.replies', 'replies')
      .leftJoinAndSelect('comments.user', 'user')
      .orderBy('comments.createdAt', 'DESC')
      .where('posts.slug = :postSlug', { postSlug })
      .getOne();

    if (!post) {
      throw new NotFoundException('no posts');
    }

    return post;
  }
}
