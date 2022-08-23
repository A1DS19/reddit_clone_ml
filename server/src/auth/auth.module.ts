import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, PassportModule, ConfigModule],
  providers: [
    AuthService,
    { useClass: CurrentUserInterceptor, provide: APP_INTERCEPTOR },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
