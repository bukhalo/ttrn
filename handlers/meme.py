from misc import dp
from aiogram import types, filters
from utils import decision


@dp.message_handler(
    filters.Text(equals=['дока', 'доку', 'документация', 'документацию'], ignore_case=True),
    chat_type=types.ChatType.SUPERGROUP
)
async def doka(msg: types.Message):
    await msg.answer('Доку профессора писали наверное')


@dp.message_handler(
    filters.Text(equals=['пидор', 'пидорас'], ignore_case=True),
    chat_type=types.ChatType.SUPERGROUP
)
async def pidor(msg: types.Message):
    await msg.answer('тотарен')


@dp.message_handler(
    filters.Text(equals=['тотарен', 'тотарин', 'толик', 'толян', 'еболик'], ignore_case=True),
    chat_type=types.ChatType.SUPERGROUP
)
async def totaren(msg: types.Message):
    await msg.answer('пидор')


@dp.message_handler(
    filters.Text(equals=['ярик', 'ярек', 'ярослав'], ignore_case=True),
    chat_type=types.ChatType.SUPERGROUP
)
async def yarek(msg: types.Message):
    if decision(0.5):
        await msg.answer('Вы всё ещё готовите на огне @yaroslav_y? Тогда мы идём к вам.')


@dp.message_handler(chat_type=types.ChatType.SUPERGROUP)
async def toopa(msg: types.Message):
    if decision(0.05):
        await msg.reply('ТУПА АЛЕГАНТОР))))))')
