import 'dotenv/config';
import Telegraf, { Extra } from 'telegraf';
import { Request, Response } from 'express';
import { booleanRandomizer } from './core/utils';
import { ALLOWED_POST_TO_GROUP, BOT_GROUP } from './core/bot.constants';

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN as string);

bot.hears(new RegExp('(а|т)(т|ы|о|а)(т|р)(т|р|о|а|н)', 'gi'), ctx => {
  ctx.reply('пидор');
});

bot.hears(new RegExp('(п)(и)(д)(о|а|р|э)', 'gi'), ctx => {
  ctx.reply('тотарен');
});

bot.hears(new RegExp('(я)(р)(е|и)(к)', 'gi'), ctx => {
  if (booleanRandomizer(50)) {
    ctx.reply('Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.');
  }
});

bot.on('message', (ctx, next) => {
  // @ts-ignore
  const messageId = ctx.update.message.message_id;

  if (booleanRandomizer(1)) {
    // @ts-ignore
    ctx.reply('ТУПА АЛЕГАНТОР))))))', Extra.inReplyTo(messageId));
    // @ts-ignore
    next();
  } else {
    // @ts-ignore
    next();
  }
});

bot.on('message', (ctx, next) => {
  const isPm = ctx.update?.message?.chat?.type === 'private';
  const senderId = ctx.update?.message?.from?.id;
  const message = ctx.update?.message?.text;
  // @ts-ignore
  const isUserAllowed = ALLOWED_POST_TO_GROUP.includes(senderId);

  if (isPm && message && senderId && isUserAllowed) {
    // @ts-ignore
    ctx.tg.sendMessage(BOT_GROUP, message);
    // @ts-ignore
    next();
  }

  // @ts-ignore
  next();
});

bot.hears(['алярм', 'алярма', 'эй чушканы'], ctx => {
  ctx.reply(
    '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
  );
});

bot.command(['all', 'alarm', 'all@totaren_bot', 'alarm@totaren_bot'], ctx => {
  ctx.reply(
    '@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, @r_levkovych, @sunnydaily, @kirich_l, @Derik117',
  );
});

export const webhook = async (req: Request, res: Response) => {
  await bot.handleUpdate(req.body, res);
  res.status(200).send('OK');
};
