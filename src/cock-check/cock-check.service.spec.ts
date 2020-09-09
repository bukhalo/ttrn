import { Test, TestingModule } from '@nestjs/testing';
import { CockCheckService } from './cock-check.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

describe('CockCheckService', () => {
  let service: CockCheckService;

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
      providers: [CockCheckService],
    }).compile();

    service = module.get<CockCheckService>(CockCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
