import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Post as PostEntity } from 'src/entities/post.entity';
import { User } from 'src/entities/user.entity';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createPost(
    @Body() body: CreatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return await this.postsService.createPost(body, user);
  }

  @Get('/get-all?')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllPosts(@Query('userId') userId: number): Promise<PostEntity[]> {
    return await this.postsService.getAllPostsHome(userId);
  }

  @Get('/:slug?')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllPostsByCommunitySlug(
    @Param('slug') slug: string,
    @Query('userId') userId: number,
  ): Promise<PostEntity[]> {
    return await this.postsService.getAllPostsByCommunitySlug(slug, userId);
  }

  @Get('/get-by-id/:postId')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getPostById(
    @Param('postId') postId: number,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    return await this.postsService.getPostById(postId, user);
  }

  @Get('/get-by-slug/:slug?')
  @UseInterceptors(ClassSerializerInterceptor)
  async getPostBySlug(
    @Param('slug') slug: string,
    @Query('userId') userId: number,
  ): Promise<PostEntity> {
    return await this.postsService.getPostBySlug(slug, userId);
  }
}
