const TelegramBot = require('node-telegram-bot-api');
const askBot = require('./bot/askBot');

class TelegramBotStart {
  constructor(token) {
    this.token = token;
    this.bot = new TelegramBot(this.token, { polling: true });

    this.bot.on('message', this.handleMessage.bind(this));
  }

  // Function to handle the /help command
  handleHelpCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'This is a bot written in JavaScript.');
  }

  // Function to handle the /support command
  handleSupportCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'Support');
  }

  // Function to handle the /profile command
  handleProfileCommand(msg) {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || 'N/A';
    const username = msg.from.username || 'N/A';
    const userId = msg.from.id;

    const profileInfo = `First Name: ${firstName}\nLast Name: ${lastName}\nUsername: ${username}\nUser ID: ${userId}`;

    this.bot.sendMessage(chatId, profileInfo);
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
    this.bot.sendMessage(chatId, 'I don\'t know this command. Type /start to see the list of available commands.');
  }

  // Function to handle incoming messages
  handleMessage(msg) {
    const command = msg.text;
    
    switch (command) {
      case '/start':
        this.handleStartCommand(msg);
        break;

      case '📖 Info':
        this.handleHelpCommand(msg);
        break;

      case '❤️ Help':
        this.handleSupportCommand(msg);
        break;

      case '👨🏼‍💻 Profile':
        this.handleProfileCommand(msg);
        break;
      
      case '🏖 ask':
        askBot.askMessage(this.bot, msg.chat.id);
        break;

      default:
        this.handleOtherMessages(msg);
        break;
    }
  }
}

module.exports = TelegramBotStart;
