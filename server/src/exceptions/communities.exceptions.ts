import { BadRequestException } from '@nestjs/common';

export class CommunityNameFoundException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}
