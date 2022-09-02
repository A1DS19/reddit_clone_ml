import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from 'src/entities/community.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Community])],
  providers: [CommunitiesService],
  controllers: [CommunitiesController],
  exports: [TypeOrmModule],
})
export class CommunitiesModule {}
