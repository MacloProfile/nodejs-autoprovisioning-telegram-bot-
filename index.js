const TelegramBot = require('node-telegram-bot-api');

// Ваш токен бота
const TOKEN = '6341597101:AAH84B_XZ8fye7sxL0wHdakzss8l180CB8M';

// Создаем экземпляр бота
const bot = new TelegramBot(TOKEN, { polling: true });

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'бот на js');
});

// Обработка команды /support
bot.onText(/\/support/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'саппорт');
});

// Обработка команды /profile
bot.onText(/\/profile/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const lastName = msg.from.last_name;
  const username = msg.from.username;
  const userId = msg.from.id;

  let profileInfo = `Имя: ${firstName}\n`;
  profileInfo += `Фамилия: ${lastName || 'N/A'}\n`;
  profileInfo += `Имя пользователя: ${username || 'N/A'}\n`;
  profileInfo += `ID пользователя: ${userId}`;

  bot.sendMessage(chatId, profileInfo);
});
