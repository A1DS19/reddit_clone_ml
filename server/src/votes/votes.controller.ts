import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/entities/user.entity';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private votesService: VotesService) {}

  @Get('/:postId')
  async getVoteCountForPostId(
    @Param('postId') postId: number,
  ): Promise<number> {
    return await this.votesService.getVoteCountForPostId(postId);
  }

  @Put('/update-post-vote/:postId?')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  async updatePostVoteForPostId(
    @Param('postId') postId: number,
    @CurrentUser() user: User,
    @Query('value') value: number,
  ) {
    return await this.votesService.updatePostVoteForPostId(postId, user, value);
  }
}
