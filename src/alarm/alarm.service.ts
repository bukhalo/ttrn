import { Injectable } from '@nestjs/common';
import { TelegrafCommand, TelegrafHears } from 'nestjs-telegraf';
import { ContextMessageUpdate } from 'telegraf';

@Injectable()
export class AlarmService {
  @TelegrafHears(['алярм', 'алярма', 'эй чушканы'])
  hearsAlarm(ctx: ContextMessageUpdate) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
  }

  @TelegrafCommand(['all', 'alarm', 'all@totaren_bot', 'alarm@totaren_bot'])
  commandAlarm(ctx: ContextMessageUpdate) {
    ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
  }
}
