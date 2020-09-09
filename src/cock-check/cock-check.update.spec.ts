import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CockCheckUpdate } from './cock-check.update';
import { CockCheckService } from './cock-check.service';

describe('CockCheckService', () => {
  let service: CockCheckUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        BullModule.registerQueueAsync({
          name: 'cockCheck',
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            redis: {
              host: configService.get<string>('redis.host'),
              port: configService.get<number>('redis.port'),
              password: configService.get<string>('redis.password'),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [CockCheckUpdate, CockCheckService],
    }).compile();

    service = module.get<CockCheckUpdate>(CockCheckUpdate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
