import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TelegrafOn, ContextMessageUpdate } from 'nestjs-telegraf';

@Injectable()
export class RepostService {
  constructor(private readonly configService: ConfigService) {
    this.chatId = configService.get<number>('repost.chatId');
  }
  private readonly chatId: number;

  private isUserHasAccessForRepost(ctx: ContextMessageUpdate): boolean {
    const isPm = ctx.update?.message?.chat?.type === 'private';
    const senderId = ctx.update?.message?.from?.id;
    const isUserAllowed = this.configService
      .get<number[]>('repost.allowedUserIds')
      .includes(senderId);
    return isPm && senderId && isUserAllowed;
  }

  @TelegrafOn('text')
  async repostText(ctx: ContextMessageUpdate, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendMessage(this.chatId, ctx.update.message.text);
    }
    next();
  }

  @TelegrafOn('sticker')
  async repostSticker(ctx: ContextMessageUpdate, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendSticker(
        this.chatId,
        ctx.update.message.sticker.file_id,
      );
    }
    next();
  }

  @TelegrafOn('audio')
  async repostAudio(ctx: ContextMessageUpdate, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendAudio(
        this.chatId,
        ctx.update.message.audio.file_id,
      );
    }
    next();
  }
}
