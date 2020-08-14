import { Test, TestingModule } from '@nestjs/testing';
import { PeopleMemesService } from './people-memes.service';

describe('PeopleMemesService', () => {
  let service: PeopleMemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeopleMemesService],
    }).compile();

    service = module.get<PeopleMemesService>(PeopleMemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
