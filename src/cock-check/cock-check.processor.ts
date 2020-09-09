import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { CockCheckService } from './cock-check.service';

@Processor('cockCheck')
export class CockCheckProcessor {
  constructor(private readonly cockCheckService: CockCheckService) {}

  @Process('set-cock')
  setCock(job: Job) {
    this.cockCheckService.sendCock(job);
  }

  @Process('kick')
  kick(job: Job) {
    this.cockCheckService.kickUser(job.data.id);
  }
}
