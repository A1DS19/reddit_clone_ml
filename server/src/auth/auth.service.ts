import { BadRequestException, Injectable } from '@nestjs/common';
import {
  EmailFoundException,
  UsernameFoundException,
  UsernameNotFoundException,
} from 'src/exceptions/auth.exceptions';
import { UsersService } from 'src/users/users.service';
import { SignupUserDto } from './dtos/signup.dto';
import { hash, verify } from 'argon2';
import { UsernameLoginDto } from './dtos/login.dto';
import { User } from 'src/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { IEnvConfiguration } from 'src/config/envConfiguration';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService<IEnvConfiguration>,
  ) {}

  async signup({
    email,
    password,
    repeatPassword,
    username,
  }: SignupUserDto): Promise<User> {
    const userName = await this.usersService.findUserByUsername(username);
    const userEmail = await this.usersService.findUserByEmail(email);

    if (userName) {
      throw new UsernameFoundException('username already exists');
    }

    if (userEmail) {
      throw new EmailFoundException('email already exists');
    }

    if (password !== repeatPassword) {
      throw new BadRequestException('passwords are not equal');
    }

    const hashedPassword = await hash(password);

    const expirationDate = this.createSessionExpirationDate();

    const newUserData: User = {
      email,
      username,
      password: hashedPassword,
      session_expiration_time: expirationDate,
    } as User;

    const user = await this.usersService.createUser(newUserData);

    return user;
  }

  async loginWithUsername({
    username,
    password,
  }: UsernameLoginDto): Promise<User> {
    const user = await this.usersService.findUserByUsername(username);

    if (!user) {
      throw new UsernameNotFoundException('login error');
    }

    const isPasswordVerified = await verify(user.password, password);

    if (!isPasswordVerified) {
      throw new BadRequestException('login error');
    }

    const expirationDate = this.createSessionExpirationDate();

    return this.usersService.updateSessionExpirationTime(
      user.id,
      expirationDate,
    );
  }

  createSessionExpirationDate(): Date {
    const expiresIn = this.configService.get('SESSION_EXPIRATION_TIME');
    const date = dayjs().add(expiresIn, 'ms');
    return date.toDate();
  }
}
