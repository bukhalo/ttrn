import { Test, TestingModule } from '@nestjs/testing';
import { CockCheckUpdate } from './cock-check.update';

describe('CockCheckService', () => {
  let service: CockCheckUpdate;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CockCheckUpdate],
    }).compile();

    service = module.get<CockCheckUpdate>(CockCheckUpdate);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
