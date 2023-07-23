const TelegramBot = require('node-telegram-bot-api');

class telegramBot {
  constructor(token) {
    this.token = token;
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', this.handleMessage.bind(this));
  }

  handleHelpCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'This is a bot written in JavaScript.');
  }

  handleSupportCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'Support');
  }

  handleProfileCommand(msg) {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || 'N/A';
    const username = msg.from.username || 'N/A';
    const userId = msg.from.id;

    const profileInfo = `First Name: ${firstName}\nLast Name: ${lastName}\nUsername: ${username}\nUser ID: ${userId}`;

    this.bot.sendMessage(chatId, profileInfo);
  }

  handleStartCommand(msg) {
    const chatId = msg.chat.id;

    const menuOptions = {
      reply_markup: {
        keyboard: [
          ['/help', '/support'],
          ['/profile']
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    };

    this.bot.sendMessage(chatId, 'Выберите команду из меню:', menuOptions);
  }

  handleOtherMessages(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'I don\'t know this command. Type /help to see the list of available commands.');
  }

  handleMessage(msg) {
    const command = msg.text;

    switch (command) {
      case '/start':
        this.handleStartCommand(msg);
        break;

      case '/help':
        this.handleHelpCommand(msg);
        break;

      case '/support':
        this.handleSupportCommand(msg);
        break;

      case '/profile':
        this.handleProfileCommand(msg);
        break;

      default:
        this.handleOtherMessages(msg);
        break;
    }
  }
}

module.exports = telegramBot;
