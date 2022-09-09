import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Community } from 'src/entities/community.entity';
import { User } from 'src/entities/user.entity';
import { CommunityNameFoundException } from 'src/exceptions/communities.exceptions';
import { Equal, ILike, In, Repository } from 'typeorm';
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

  async getCommunityBySlug(slug: string): Promise<Community> {
    const community = await this.communityRepository
      .createQueryBuilder('community')
      .leftJoinAndSelect('community.creator', 'creator')
      .leftJoinAndSelect('community.members', 'members')
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
      relations: ['members', 'creator'],
      where: { creator: In([user.id]), name: ILike(`%${communityName}%`) },
      order: { name: 'ASC' },
    });

    if (!communities) {
      throw new NotFoundException('no communities available');
    }

    return communities;
  }

  async getJoinedCommunities(user: User): Promise<Community[]> {
    const communities = await this.communityRepository
      .createQueryBuilder('community')
      .leftJoinAndSelect('community.members', 'members')
      .where('members.id =:userId', { userId: user.id })
      .getMany();

    if (!communities) {
      throw new NotFoundException('no communities available');
    }

    return communities;
  }

  async getRandomCommunities(): Promise<Community[]> {
    const communities = await this.communityRepository.find();

    if (!communities) {
      throw new NotFoundException('no communities available');
    }

    return communities;
  }

  async leaveJoinCommunityById(
    communityId: number,
    user: User,
  ): Promise<User[]> {
    const community = await this.communityRepository.findOne({
      where: { id: communityId },
      relations: ['members'],
    });

    // leave community
    if (community.members.find((usr) => usr.id === user.id)) {
      community.members = community.members.filter((usr) => usr.id !== user.id);
      await this.communityRepository.save(community);
      return community.members;
    }

    // join community
    community.members.push(user);
    await this.communityRepository.save(community);
    return community.members;
  }
}
