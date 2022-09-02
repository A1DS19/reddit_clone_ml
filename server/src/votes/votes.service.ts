import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Vote } from 'src/entities/vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote) private votesRepository: Repository<Vote>,
  ) {}

  async getVoteCountForPostId(postId: number): Promise<number> {
    const { sum } = await this.votesRepository
      .createQueryBuilder('vote')
      .select('SUM(vote.vote_type)', 'sum')
      .where('vote.postId =:postId', { postId })
      .getRawOne();

    return sum;
  }

  async updatePostVoteForPostId(postId: number, user: User, value: number) {
    const vote = await this.votesRepository
      .createQueryBuilder('vote')
      .select()
      .where('vote.postId =:postId', { postId })
      .andWhere('vote.userId =:userId', { userId: user.id })
      .getOne();

    if (!vote) {
      const newVote = await this.votesRepository.create({
        postId,
        user,
        vote_type: value,
      });

      return await this.votesRepository.save(newVote);
    }

    vote.vote_type = value;

    return await this.votesRepository.save(vote);
  }
}
