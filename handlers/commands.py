from aiogram import types
import aiogram.utils.markdown as md
from misc import dp
from config import admin_ids


@dp.message_handler(commands=['all', 'alarm'], chat_type=types.ChatType.SUPERGROUP)
@dp.message_handler(text=['алярм', 'алярма', 'эй чушканы'], chat_type=types.ChatType.SUPERGROUP)
async def mention_all(msg: types.Message):
    """
    Handler for mention all in chat.
    :param msg:
    """
    await msg.answer('@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, '
                     '@r_levkovych, @sunnydaily, @kirich_l, @Derik117')


@dp.message_handler(
    lambda message: message['from']['id'] in admin_ids,
    commands=['deanon']
)
async def deanon_cmd(msg: types.Message):
    if msg.reply_to_message:
        user = msg.reply_to_message.from_user
        await msg.reply(
            md.text(
                md.text(f"ID: {user.id}"),
                md.text(f"Username: {user.username or '?'}"),
                md.text(f"Fist name: {user.first_name}"),
                md.text(f"Last name: {user.last_name or '?'}"),
                md.text(f"Is bot?: {user.is_bot}"),
                sep='\n'
            )
        )
