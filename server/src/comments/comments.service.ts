import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async createComment(
    { body }: CreateCommentDto,
    userId: number,
    postId: number,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.create({
      body,
      userId,
      postId,
    });

    if (!comment) {
      throw new BadRequestException('an error has ocurred');
    }

    await this.commentsRepository.save(comment);

    const newComment = await this.commentsRepository.findOne({
      where: { id: comment.id },
      relations: ['user', 'replies'],
    });

    return newComment;
  }
}
