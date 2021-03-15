from aiogram import types
from aiogram.utils.callback_data import CallbackData
from misc import bot, dp

shield = CallbackData("shield", "user_id", "action")


@dp.message_handler(content_types=[types.ContentType.NEW_CHAT_MEMBERS])
async def new_member(msg: types.Message):
    if msg.from_user in msg.new_chat_members:
        buttons = [
            types.InlineKeyboardButton(text="Ні", callback_data=shield.new(user_id=msg.from_user.id, action="allow")),
            types.InlineKeyboardButton(text="Підор", callback_data=shield.new(user_id=msg.from_user.id, action="block")),
        ]
        keyboard = types.InlineKeyboardMarkup(row_width=1)
        keyboard.add(*buttons)
        await msg.answer("Ти пидор чи ні?", reply_markup=keyboard)
        await bot.restrict_chat_member(chat_id=msg.chat.id, user_id=msg.from_user.id)


@dp.callback_query_handler(shield.filter(action=["allow"]))
async def shield_allow(call: types.CallbackQuery, callback_data: dict):
    user_id = int(callback_data['user_id'])
    if call.from_user.id == user_id:
        await bot.restrict_chat_member(
            chat_id=call.message.chat.id,
            user_id=call.from_user.id,
            permissions=types.ChatPermissions(can_send_messages=True))
        await call.answer('Прийнято!')
    else:
        await call.answer('Не для тебе кнопка зроблена, пес.')


@dp.callback_query_handler(shield.filter(action=["block"]))
async def shield_block(call: types.CallbackQuery, callback_data: dict):
    user_id = int(callback_data['user_id'])
    if call.from_user.id == user_id:
        await call.answer('Прийнято!')
        await bot.kick_chat_member(chat_id=call.message.chat.id, user_id=user_id)
    else:
        await call.answer('Не для тебе кнопка зроблена, пес.')
