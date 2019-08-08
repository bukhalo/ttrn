import * as dotenv from 'dotenv';
dotenv.config();

import Telegraf, { ContextMessageUpdate } from 'telegraf';

const bot = new Telegraf(process.env.TG_BOT_TOKEN);

bot.hears(new RegExp('(а|т)(т|ы|о|а)(т|р)(т|р|о|а|н)', 'gi'), (ctx: ContextMessageUpdate) => {
  ctx.reply('пидор');
});

bot.hears(new RegExp('(п)(и)(д)(о|а|р|э)', 'gi'), (ctx: ContextMessageUpdate) => {
  ctx.reply('тотарен');
});

bot.launch();
