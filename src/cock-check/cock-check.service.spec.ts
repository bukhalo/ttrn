import { Test, TestingModule } from '@nestjs/testing';
import { CockCheckService } from './cock-check.service';

describe('CockCheckService', () => {
  let service: CockCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CockCheckService],
    }).compile();

    service = module.get<CockCheckService>(CockCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
