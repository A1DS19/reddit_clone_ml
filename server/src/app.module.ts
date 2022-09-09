import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/TypeOrmConfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfiguration, IEnvConfiguration } from './config/envConfiguration';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommunitiesModule } from './communities/communities.module';
import { VotesModule } from './votes/votes.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService<IEnvConfiguration>) => {
        return new TypeOrmConfig(config).getConfiguration();
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    CommunitiesModule,
    VotesModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
