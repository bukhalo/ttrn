import logging

from aiogram import Bot, Dispatcher
from config import TOKEN

bot = Bot(token=TOKEN)
dp = Dispatcher(bot=bot)
logging.basicConfig(level=logging.DEBUG)

