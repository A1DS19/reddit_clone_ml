import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvConfiguration } from 'src/config/envConfiguration';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsernameLoginDto } from './dtos/login.dto';
import { SignupUserDto } from './dtos/signup.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService<IEnvConfiguration>,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    // Depending on who I'm logged in as, it'll return the user info automatically
    return user;
  }

  @Post('/login-username')
  async loginWithUsername(
    @Body() body: UsernameLoginDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.loginWithUsername(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signup')
  async signUp(
    @Body() body: SignupUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any): boolean {
    session.userId = null;
    return true;
  }
}
