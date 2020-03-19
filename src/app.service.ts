import { Injectable } from '@nestjs/common';
import {
  TelegrafHears,
  TelegrafCommand,
  TelegrafOn,
  ContextMessageUpdate,
} from 'nestjs-telegraf';
import { Extra } from 'telegraf';
import { booleanRandomizer } from './common/utils';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @TelegrafHears(new RegExp('(а|т)(т|ы|о|а)(т|р)(т|р|о|а|н)', 'gi'))
  async pidor(ctx: ContextMessageUpdate) {
    await ctx.reply('пидор');
  }

  @TelegrafHears(new RegExp('(п)(и)(д)(о|а|р|э)', 'gi'))
  async totaren(ctx: ContextMessageUpdate) {
    await ctx.reply('тотарен');
  }

  @TelegrafHears(['ярик', 'Ярик', 'ярек', 'Ярек'])
  async yarekHears(ctx: ContextMessageUpdate) {
    await ctx.reply(
      'Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.',
    );
  }

  @TelegrafOn('message')
  async toopaAlegantor(ctx: ContextMessageUpdate) {
    const messageId = ctx.update.message.message_id;

    if (booleanRandomizer(1)) {
      // @ts-ignore
      await ctx.reply('ТУПА АЛЕГАНТОР))))))', Extra.inReplyTo(messageId));
    }
    return;
  }

  /**
   * Waiting https://github.com/bukhalo/nestjs-telegraf/issues/42
   */
  @TelegrafHears(['алярм', 'алярма', 'эй чушканы'])
  async alarm(ctx: ContextMessageUpdate) {
    await ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
  }

  /**
   * Waiting https://github.com/bukhalo/nestjs-telegraf/issues/42
   */
  @TelegrafCommand(['all', 'alarm'])
  async allCommand(ctx: ContextMessageUpdate) {
    await ctx.reply(
      '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
    );
  }
}
