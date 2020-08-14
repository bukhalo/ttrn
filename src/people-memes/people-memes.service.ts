import { Injectable } from '@nestjs/common';
import { TelegrafHears, TelegrafOn, ContextMessageUpdate } from 'nestjs-telegraf';
import { booleanRandomizer } from '../core/utils';

@Injectable()
export class PeopleMemesService {
  @TelegrafHears(new RegExp('(а|т)(т|ы|о|а)(т|р)(т|р|о|а|н)', 'gi'))
  hearsTotaren(ctx: ContextMessageUpdate, next) {
    if (booleanRandomizer(50)) {
      ctx.reply('пидор');
    }
    next();
  }

  @TelegrafHears(new RegExp('(п)(и)(д)(о|а|р|э)', 'gi'))
  hearsPidor(ctx: ContextMessageUpdate, next) {
    if (booleanRandomizer(50)) {
      ctx.reply('тотарен');
    }
    next();
  }

  @TelegrafHears(new RegExp('(я)(р)(е|и)(к)', 'gi'))
  hearsYarek(ctx: ContextMessageUpdate, next) {
    if (booleanRandomizer(50)) {
      ctx.reply('Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.');
    }
    next();
  }

  @TelegrafOn('message')
  toopa(ctx: ContextMessageUpdate, next) {
    const messageId = ctx.update.message.message_id;

    if (booleanRandomizer(1) && messageId) {
      // @ts-ignore
      ctx.reply('ТУПА АЛЕГАНТОР))))))', Extra.inReplyTo(messageId));
    } else {
      next();
    }
  }
}
