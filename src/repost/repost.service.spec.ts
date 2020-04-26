import { Test, TestingModule } from '@nestjs/testing';
import { RepostService } from './repost.service';

describe('RepostService', () => {
  let service: RepostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepostService],
    }).compile();

    service = module.get<RepostService>(RepostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
