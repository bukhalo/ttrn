import { Injectable } from '@nestjs/common';
import { Command, Hears, Context } from 'nestjs-telegraf';

@Injectable()
export class AlarmService {
  @Hears(['алярм', 'алярма', 'эй чушканы'])
  hearsAlarm(ctx: Context, next) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
    next();
  }

  @Command(['all', 'alarm', 'all@totaren_bot', 'alarm@totaren_bot'])
  commandAlarm(ctx: Context, next) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
    next();
  }
}
