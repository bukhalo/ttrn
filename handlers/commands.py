from aiogram import types
from misc import dp

@dp.message_handler(commands=['all', 'alarm'], chat_type=types.ChatType.SUPERGROUP)
@dp.message_handler(text=['алярм', 'алярма', 'эй чушканы'], chat_type=types.ChatType.SUPERGROUP)
async def mention_all(msg: types.Message):
    """
    Handler for mention all in chat.
    :param msg:
    """
    await msg.answer('@bukhalo, @yaroslav_y, @qwertydemo, @ekzotech, @apushkarev, @spiritsn, @gusevsd, @uuttff8, '
                     '@r_levkovych, @sunnydaily, @kirich_l, @Derik117')
