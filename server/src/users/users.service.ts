import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupUserDto } from 'src/auth/dtos/signup.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findById(id: number): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async createUser(body: SignupUserDto): Promise<User> {
    const user = this.usersRepository.create(body);
    return await this.usersRepository.save(user);
  }

  async updateSessionExpirationTime(
    id: number,
    session_expiration_time: Date,
  ): Promise<User> {
    await this.usersRepository
      .createQueryBuilder('user')
      .update(User)
      .set({ session_expiration_time })
      .where('id = :id', { id })
      .execute();

    return await this.usersRepository.findOneBy({ id });
  }
}
