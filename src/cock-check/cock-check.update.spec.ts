import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CockCheckUpdate } from './cock-check.update';
import { CockCheckService } from './cock-check.service';

describe('CockCheckService', () => {
  let service: CockCheckUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        BullModule.registerQueue({
          name: 'cockCheck',
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
