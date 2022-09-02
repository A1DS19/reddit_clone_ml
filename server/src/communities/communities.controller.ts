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
import { Community } from 'src/entities/community.entity';
import { User } from 'src/entities/user.entity';
import { CommunitiesService } from './communities.service';
import { CreateCommunityDto } from './dtos/create-community.dto';

@Controller('communities')
@UseInterceptors(ClassSerializerInterceptor)
export class CommunitiesController {
  constructor(private communityService: CommunitiesService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async createCommunity(
    @CurrentUser() user: User,
    @Body() body: CreateCommunityDto,
  ): Promise<Community> {
    return await this.communityService.createCommunity(body, user);
  }

  @Get('/community/:slug?')
  async getCommunityBySlug(
    @Param('slug') slug: string,
    @Query('userId') userId: number,
  ): Promise<Community> {
    return await this.communityService.getCommunityBySlug(slug, userId);
  }

  @Get('/joined-communities')
  @UseGuards(AuthGuard)
  async getJoinedCommunities(@CurrentUser() user: User): Promise<Community[]> {
    return await this.communityService.getJoinedCommunities(user);
  }

  @Get('/joined-communities-filter/:communityName')
  @UseGuards(AuthGuard)
  async getJoinedCommunitiesFilter(
    @CurrentUser() user: User,
    @Param('communityName') communityName: string,
  ): Promise<Community[]> {
    return await this.communityService.getJoinedCommunitiesFilter(
      user,
      communityName,
    );
  }
}
