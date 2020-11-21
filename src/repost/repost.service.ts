import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { On, Context } from 'nestjs-telegraf';

@Injectable()
export class RepostService {
  constructor(private readonly configService: ConfigService) {}

  private readonly botGroupId = this.configService.get<number>(
    'app.botGroupId',
  );

  private isUserHasAccessForRepost(ctx: Context): boolean {
    const isPm = ctx.update?.message?.chat?.type === 'private';
    return isPm;

    const senderId = ctx.update?.message?.from?.id;
    const isUserAllowed = this.configService
      .get<number[]>('repost.allowedUserIds')
      .includes(senderId);
    return isPm && senderId && isUserAllowed;
  }

  @On('text')
  async repostText(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendMessage(this.botGroupId, ctx.update.message.text);
    }
    await next();
  }

  @On('sticker')
  async repostSticker(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendSticker(
        this.botGroupId,
        ctx.update.message.sticker.file_id,
      );
    }
    await next();
  }

  @On('audio')
  async repostAudio(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendAudio(
        this.botGroupId,
        ctx.update.message.audio.file_id,
      );
    }
    await next();
  }

  @On('document')
  async repostDocument(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      await ctx.telegram.sendDocument(
        this.botGroupId,
        ctx.update.message.document.file_id,
      );
    }
    await next();
  }

  @On('photo')
  async repostPhoto(ctx: Context, next) {
    if (this.isUserHasAccessForRepost(ctx)) {
      for (const photo of ctx.update.message.photo) {
        await ctx.telegram.sendPhoto(this.botGroupId, photo.file_id);
      }
    }
    await next();
  }
}
