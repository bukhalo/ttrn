from aiogram import types
from misc import bot, dp
from config import GROUP_ID, admin_ids


@dp.message_handler(
    lambda message: message['from']['id'] in admin_ids,
    content_types=[
        types.ContentType.TEXT,
        types.ContentType.DICE,
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
    # if self.animation:
    #     return ContentType.ANIMATION
    # if self.document:
    #     return ContentType.DOCUMENT
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
    # if self.poll:
    #     return ContentType.POLL
    if content_type is types.ContentType.DICE:
        await bot.send_dice(chat_id=GROUP_ID)
