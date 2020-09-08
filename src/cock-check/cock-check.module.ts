import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CockCheckUpdate } from './cock-check.update';
import { CockCheckService } from './cock-check.service';
import { CockCheckProcessor } from './cock-check.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'cockCheck',
    }),
  ],
  providers: [CockCheckUpdate, CockCheckService, CockCheckProcessor],
})
export class CockCheckModule {}
