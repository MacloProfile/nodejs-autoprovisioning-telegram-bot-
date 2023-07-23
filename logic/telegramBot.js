const TelegramBot = require('node-telegram-bot-api');
const commandHandlers = require('./bot/simpleCommands');
const botLogic = require('./bot/askBot');

class TelegramBotWrapper {
  constructor(token) {
    this.token = token;
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', this.handleMessage.bind(this));
  }

  // Function to handle the /start command to show the menu
  handleStartCommand(msg) {
    const chatId = msg.chat.id;

    const menuOptions = {
      reply_markup: {
        keyboard: [
          ['📖 Info', '❤️ Help'],
          ['👨🏼‍💻 Profile', '🏖 ask']
        ],
        resize_keyboard: true,
        one_time_keyboard: false // Set to false to keep the keyboard visible after selection
      }
    };

    this.bot.sendMessage(chatId, 'Choose a command from the menu:', menuOptions);
  }

  // Function to handle other messages
  handleOtherMessages(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'I don\'t know this command. Type 📖 Info to see the list of available commands.');
  }

  // Function to handle incoming messages
  handleMessage(msg) {
    const command = msg.text;
    
    switch (command) {
      case '/start':
        this.handleStartCommand(msg);
        break;

      case '📖 Info':
        commandHandlers.handleHelpCommand(this.bot, msg.chat.id);
        break;

      case '❤️ Help':
        commandHandlers.handleSupportCommand(this.bot, msg.chat.id);
        break;

      case '👨🏼‍💻 Profile':
        commandHandlers.handleProfileCommand(this.bot, msg.chat.id, msg);
        break;

      case '🏖 ask':
        botLogic.askMessage(this.bot, msg.chat.id);
        break;

      default:
        this.handleOtherMessages(msg);
        break;
    }
  }
}

module.exports = TelegramBotWrapper;
