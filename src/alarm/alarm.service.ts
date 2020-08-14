import { Injectable } from '@nestjs/common';
import {
  TelegrafCommand,
  TelegrafHears,
  ContextMessageUpdate,
} from 'nestjs-telegraf';

@Injectable()
export class AlarmService {
  @TelegrafHears(['алярм', 'алярма', 'эй чушканы'])
  hearsAlarm(ctx: ContextMessageUpdate, next) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
    next();
  }

  @TelegrafCommand(['all', 'alarm', 'all@totaren_bot', 'alarm@totaren_bot'])
  commandAlarm(ctx: ContextMessageUpdate, next) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
    next();
  }
}
