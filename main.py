import logging
import random

from os import getenv
from aiogram import Bot, Dispatcher, types, executor, filters

TOKEN = getenv('TOKEN')
GROUP_ID = getenv('GROUP')
logging.basicConfig(level=logging.DEBUG)

bot = Bot(token=TOKEN)
dp = Dispatcher(bot=bot)


def decision(probability: float):
    return random.random() < probability


@dp.message_handler(commands=['all', 'alarm'], chat_type=types.ChatType.SUPERGROUP)
@dp.message_handler(text=['алярм', 'алярма', 'эй чушканы'], chat_type=types.ChatType.SUPERGROUP)
async def mention_all(msg: types.Message):
    """
    Handler for mention all in chat.
    :param msg:
    """
    await msg.answer('@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, '
                     '@r_levkovych, @sunnydaily, @kirich_l, @Derik117')


@dp.message_handler(filters.Text(equals=['дока', 'доку', 'документация', 'документацию'], ignore_case=True))
async def doka(msg: types.Message):
    await msg.answer('Доку профессора писали наверное')


@dp.message_handler(filters.Text(equals=['пидор', 'пидорас'], ignore_case=True))
async def pidor(msg: types.Message):
    await msg.answer('пидор')


@dp.message_handler(filters.Text(equals=['тотарен', 'тотарин', 'толик', 'толян', 'еболик'], ignore_case=True))
async def totaren(msg: types.Message):
    await msg.answer('пидор')


@dp.message_handler(filters.Text(equals=['ярик', 'ярек', 'ярослав'], ignore_case=True))
async def yarek(msg: types.Message):
    if decision(0.5):
        await msg.answer('Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.')


@dp.message_handler()
async def toopa(msg: types.Message):
    if decision(0.05):
        await msg.reply('ТУПА АЛЕГАНТОР))))))')


@dp.message_handler(
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


if __name__ == '__main__':
    executor.start_polling(dp)
