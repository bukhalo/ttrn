import logging
import random

from os import getenv
from aiogram import Bot, Dispatcher, types, executor, filters

TOKEN = getenv('TOKEN')
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

if __name__ == '__main__':
    executor.start_polling(dp)
