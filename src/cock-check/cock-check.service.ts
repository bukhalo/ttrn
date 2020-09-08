import { Injectable } from '@nestjs/common';
import { Context, Markup, Extra, TelegrafProvider } from 'nestjs-telegraf';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CockCheckService {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly configService: ConfigService,

    @InjectQueue('cockCheck')
    private cockCheckQueue: Queue,
  ) {}

  private readonly chatId = this.configService.get('repost.chatId');
  private readonly kickJob = async userId =>
    await this.cockCheckQueue.getJob(`${userId}-kick`);
  private readonly setCockJob = async userId =>
    await this.cockCheckQueue.getJob(`${userId}-set-cock`);

  async check(ctx: Context) {
    // @ts-ignore FIXME: new_chat_member exist, wrong types in Telegraf
    const user = ctx.update.message.new_chat_member;
    const username =
      `@${user.username}` || `${user.first_name} ${user.last_name}`;

    await this.cockCheckQueue.add(
      'set-cock',
      user,
      { delay: 60 * 1000, jobId: `${user.id}-set-cock` }, // one minute delay
    );

    await this.cockCheckQueue.add(
      'kick',
      user,
      { delay: 70 * 1000, jobId: `${user.id}-kick` }, // one minute delay
    );

    return ctx.reply(
      `${username}, ты петушара?`,
      Extra.markup(
        Markup.inlineKeyboard([
          Markup.callbackButton('Нет', 'cock-check-answer-no'),
          Markup.callbackButton('🐓 Да', 'cock-check-answer-yes'),
        ]),
      ),
    );
  }

  async sendCock(job: any) {
    const username =
      `@${job.data.username}` || `${job.data.first_name} ${job.data.last_name}`;
    const bot: TelegrafProvider = this.moduleRef.get('TelegrafProvider', {
      strict: false,
    });
    await bot.telegram.sendMessage(this.chatId, `${username} отныне петушара`);
  }

  async kickUser(id: number) {
    const bot: TelegrafProvider = this.moduleRef.get('TelegrafProvider', {
      strict: false,
    });
    await bot.telegram.kickChatMember(this.chatId, id);
  }

  async isUserValid(ctx: Context): Promise<boolean> {
    const user = ctx.update.callback_query.from;
    const username =
      `@${user.username}` || `${user.first_name} ${user.last_name}`;
    const kickJob = await this.cockCheckQueue.getJob(`${user.id}-kick`);
    const setCockJob = await this.cockCheckQueue.getJob(`${user.id}-set-cock`);

    if (!kickJob || !setCockJob) {
      await ctx.reply(`${username}, не для тебя кнопка, пёс.`);
      return false;
    }
    return true;
  }

  async removeKickJob(ctx: Context) {
    const user = ctx.update.callback_query.from;
    const username =
      `@${user.username}` || `${user.first_name} ${user.last_name}`;
    const kickJob = await this.kickJob(user.id);
    const cockJob = await this.setCockJob(user.id);
    if (kickJob || cockJob) await ctx.reply(`${username} ок.`);
    if (kickJob) await kickJob.remove();
    if (cockJob) await cockJob.remove();
    return;
  }
}
