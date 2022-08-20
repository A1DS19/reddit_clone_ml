import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(): string {
    return 'login';
  }

  @Post('/signup')
  signUp(): string {
    return process.env.PORT;
  }
}
