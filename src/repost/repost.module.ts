import { Module } from '@nestjs/common';
import { RepostService } from './repost.service';
import { ConfigModule } from '@nestjs/config';
import { repost } from './repost.config';

@Module({
  imports: [ConfigModule.forFeature(repost)],
  providers: [RepostService],
})
export class RepostModule {}
