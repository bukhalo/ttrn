from aiogram import types
from misc import bot, dp
from config import GROUP_ID, admin_ids


def thumb(msg: types.Message):
    if hasattr(msg.document.thumb, 'file_id'):
        return msg.document.thumb.file_id


@dp.message_handler(
    lambda message: message['from']['id'] in admin_ids,
    content_types=[
        types.ContentType.TEXT,
        types.ContentType.ANIMATION,
        types.ContentType.DOCUMENT,
        types.ContentType.DICE,
        types.ContentType.POLL,
        types.ContentType.STICKER
    ],
    chat_type=types.ChatType.PRIVATE
)
async def repost(msg: types.Message):
    content_type = msg.content_type
    if content_type is types.ContentType.TEXT:
        await bot.send_message(chat_id=GROUP_ID, text=msg.text)
    # if self.audio:
    #     return ContentType.AUDIO
    if content_type is types.ContentType.ANIMATION:
        await bot.send_animation(
            chat_id=GROUP_ID,
            animation=msg.animation.file_id,
            duration=msg.animation.duration,
            width=msg.animation.width,
            height=msg.animation.height,
            thumb=thumb(msg),
            caption=msg.caption,
            caption_entities=msg.caption_entities
        )
    if content_type is types.ContentType.DOCUMENT:
        await bot.send_document(
            chat_id=GROUP_ID,
            document=msg.document.file_id,
            thumb=thumb(msg),
            caption=msg.caption,
            caption_entities=msg.caption_entities
        )
    # if self.game:
    #     return ContentType.GAME
    # if self.photo:
    #     return ContentType.PHOTO
    if content_type is types.ContentType.STICKER:
        await bot.send_sticker(chat_id=GROUP_ID, sticker=msg.sticker.file_id)
    # if self.video:
    #     return ContentType.VIDEO
    # if self.video_note:
    #     return ContentType.VIDEO_NOTE
    # if self.voice:
    #     return ContentType.VOICE
    # if self.contact:
    #     return ContentType.CONTACT
    # if self.venue:
    #     return ContentType.VENUE
    # if self.location:
    #     return ContentType.LOCATION
    if content_type is types.ContentType.POLL:
        options = list(map(lambda option: option.text, msg.poll.options))
        await bot.send_poll(
            chat_id=GROUP_ID,
            question=msg.poll.question,
            options=options,
            is_anonymous=msg.poll.is_anonymous,
            type=msg.poll.type,
            allows_multiple_answers=msg.poll.allows_multiple_answers,
            correct_option_id=msg.poll.correct_option_id,
            explanation=msg.poll.explanation,
            explanation_entities=msg.poll.explanation_entities,
            open_period=msg.poll.open_period,
            close_date=msg.poll.close_date,
            is_closed=msg.poll.is_closed,

        )
    if content_type is types.ContentType.DICE:
        await bot.send_dice(chat_id=GROUP_ID)
