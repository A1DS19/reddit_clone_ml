import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Comment } from 'src/entities/comment.entity';
import { User } from 'src/entities/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post('/create?')
  @UseGuards(AuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async createComment(
    @Body() body: CreateCommentDto,
    @Query('postId')
    postId: number,
    @CurrentUser() user: User,
  ): Promise<Comment> {
    return await this.commentsService.createComment(body, user.id, postId);
  }
}
