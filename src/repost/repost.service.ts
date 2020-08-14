import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { On, Context } from 'nestjs-telegraf';

@Injectable()
export class RepostService {
  constructor(private readonly configService: ConfigService) {
    this.chatId = configService.get<number>('repost.chatId');
  }
  private readonly chatId: number;

  private isUserHasAccessForRepost(ctx: Context): boolean {
    const isPm = ctx.update?.message?.chat?.type === 'private';
    const senderId = ctx.update?.message?.from?.id;
    const isUserAllowed = this.configService
      .get<number[]>('repost.allowedUserIds')
      .includes(senderId);
    return isPm && senderId && isUserAllowed;
  }

  @On('text')
  async repostText(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendMessage(this.chatId, ctx.update.message.text);
    }
    next();
  }

  @On('sticker')
  async repostSticker(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendSticker(
        this.chatId,
        ctx.update.message.sticker.file_id,
      );
    }
    next();
  }

  @On('audio')
  async repostAudio(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendAudio(
        this.chatId,
        ctx.update.message.audio.file_id,
      );
    }
    next();
  }
}
