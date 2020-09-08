import { Injectable } from '@nestjs/common';
import { Action, Context, On } from 'nestjs-telegraf';
import { CockCheckService } from './cock-check.service';

@Injectable()
export class CockCheckUpdate {
  constructor(private readonly cockCheckService: CockCheckService) {}

  @On('new_chat_members')
  check(ctx: Context) {
    return this.cockCheckService.check(ctx);
  }

  @Action('cock-check-answer-no')
  async cockCheckAnswerNo(ctx: Context) {
    const allowed = await this.cockCheckService.isUserValid(ctx);
    if (allowed) {
      await this.cockCheckService.removeKickJob(ctx);
    }
  }

  @Action('cock-check-answer-yes')
  async cockCheckAnswerYes(ctx: Context) {
    const allowed = await this.cockCheckService.isUserValid(ctx);
    if (allowed) {
      await this.cockCheckService.kickUser(ctx.update.callback_query.from.id);
    }
  }
}
