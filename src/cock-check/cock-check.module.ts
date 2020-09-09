import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CockCheckUpdate } from './cock-check.update';
import { CockCheckService } from './cock-check.service';
import { CockCheckProcessor } from './cock-check.processor';

@Module({
  imports: [
    BullModule.registerQueueAsync({
      name: 'cockCheck',
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get<string>('app.redisHost'),
          port: configService.get<number>('app.redisPort'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CockCheckUpdate, CockCheckService, CockCheckProcessor],
})
export class CockCheckModule {}
