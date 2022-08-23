import { BadRequestException, NotFoundException } from '@nestjs/common';

export class UsernameFoundException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}

export class EmailFoundException extends BadRequestException {
  constructor(msg: string) {
    super(msg);
  }
}

export class UsernameNotFoundException extends NotFoundException {
  constructor(msg: string) {
    super(msg);
  }
}

export class EmailNotFoundException extends NotFoundException {
  constructor(msg: string) {
    super(msg);
  }
}
