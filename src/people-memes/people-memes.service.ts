import { Injectable } from '@nestjs/common';
import { Hears, On, Context } from 'nestjs-telegraf';
import { booleanRandomizer } from '../core/utils';

@Injectable()
export class PeopleMemesService {
  @Hears(new RegExp('(а|т)(т|ы|о|а)(т|р)(т|р|о|а|н)', 'gi'))
  hearsTotaren(ctx: Context, next) {
    if (booleanRandomizer(50)) {
      ctx.reply('пидор');
    }
    next();
  }

  @Hears(new RegExp('(п)(и)(д)(о|а|р|э)', 'gi'))
  hearsPidor(ctx: Context, next) {
    if (booleanRandomizer(50)) {
      ctx.reply('тотарен');
    }
    next();
  }

  @Hears(new RegExp('(я)(р)(е|и)(к)', 'gi'))
  hearsYarek(ctx: Context, next) {
    if (booleanRandomizer(50)) {
      ctx.reply(
        'Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.',
      );
    }
    next();
  }

  @On('message')
  toopa(ctx: Context, next) {
    const messageId = ctx.update.message.message_id;

    if (booleanRandomizer(1) && messageId) {
      // @ts-ignore
      ctx.reply('ТУПА АЛЕГАНТОР))))))', Extra.inReplyTo(messageId));
    } else {
      next();
    }
  }
}
