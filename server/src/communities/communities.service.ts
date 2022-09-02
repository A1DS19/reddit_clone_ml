import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'src/entities/community.entity';
import { VoteType } from 'src/entities/enums';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { CommunityNameFoundException } from 'src/exceptions/communities.exceptions';
import { ILike, In, Repository } from 'typeorm';
import { CreateCommunityDto } from './dtos/create-community.dto';

@Injectable()
export class CommunitiesService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}

  async createCommunity(
    { about, name }: CreateCommunityDto,
    user: User,
  ): Promise<Community> {
    const existingCommunity = await this.communityRepository.findOneBy({
      name,
    });

    if (existingCommunity) {
      throw new CommunityNameFoundException('name is already taken');
    }

    const createSlugName = name
      .split(' ')
      .map((word) => word.toLowerCase())
      .join('_');

    const community = this.communityRepository.create({
      about,
      name,
      slug: createSlugName,
      creator: user,
      members: [user],
    });

    return await this.communityRepository.save(community);
  }

  async getCommunityBySlug(slug: string, userId: number): Promise<Community> {
    const community = await this.communityRepository
      .createQueryBuilder('community')
      .leftJoinAndSelect('community.creator', 'creator')
      .leftJoinAndSelect(
        'community.members',
        'members',
        'members.id =:userId',
        {
          userId,
        },
      )
      .loadRelationCountAndMap('community.memberCount', 'community.members')
      .where('community.slug = :slug', { slug })
      .getOne();

    if (!community) {
      throw new NotFoundException('community not found');
    }

    return community;
  }

  async getJoinedCommunitiesFilter(
    user: User,
    communityName: string,
  ): Promise<Community[]> {
    const communities = await this.communityRepository.find({
      where: { creator: In([user.id]), name: ILike(`%${communityName}%`) },
      order: { name: 'ASC' },
    });

    if (!communities) {
      throw new NotFoundException('no communities available');
    }

    return communities;
  }

  async getJoinedCommunities(user: User): Promise<Community[]> {
    const communities = await this.communityRepository.find({
      where: { creator: In([user.id]) },
      order: { name: 'ASC' },
    });

    if (!communities) {
      throw new NotFoundException('no communities available');
    }

    return communities;
  }
}
