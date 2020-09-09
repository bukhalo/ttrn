import { Test, TestingModule } from '@nestjs/testing';
import { RepostService } from './repost.service';
import { ConfigModule } from '@nestjs/config';

describe('RepostService', () => {
  let service: RepostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [RepostService],
    }).compile();

    service = module.get<RepostService>(RepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
