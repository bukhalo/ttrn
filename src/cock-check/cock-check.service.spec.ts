import { Test, TestingModule } from '@nestjs/testing';
import { CockCheckService } from './cock-check.service';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

describe('CockCheckService', () => {
  let service: CockCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        BullModule.registerQueue({
          name: 'cockCheck',
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
