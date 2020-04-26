import { Module } from '@nestjs/common';
import { PeopleMemesService } from './people-memes.service';

@Module({
  providers: [PeopleMemesService]
})
export class PeopleMemesModule {}
