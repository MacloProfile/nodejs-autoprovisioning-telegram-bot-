const TelegramBot = require('node-telegram-bot-api');
const BookSearch = require('./bot/second');

class TelegramBotStart {
  constructor(token) {
    this.token = token;
    this.bot = new TelegramBot(this.token, { polling: true });
    this.isReady = false;
    this.userLastMessageTime = new Map();

    this.bot.on('callback_query', this.handleCallbackQuery.bind(this));
    this.bot.on('message', this.handleMessage.bind(this));
  }

  // Function to check if the user is rate-limited
  isUserRateLimited(userId) {
    const currentTime = Date.now();
    const lastMessageTime = this.userLastMessageTime.get(userId) || 0;

    if (currentTime - lastMessageTime > 100) {
      // If more than 1 second has passed since the last message, update the last message time
      this.userLastMessageTime.set(userId, currentTime);
      return false; // User is not rate-limited
    }

    return true; // User is rate-limited
  }

  // Function to handle the /start command to show the menu
  handleStartCommand(msg) {
    const chatId = msg.chat.id;

    const menuOptions = {
      reply_markup: {
        keyboard: [
          ['📨 Look for'],
          ['📖 Info', '❤️ Help', '👨🏼‍💻 Profile'],
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

  // Function to handle the /help command
  handleHelpCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, 'The bot is written in the JavaScript programming language by this person: https://github.com/MacloProfile');
  }

  // Function to handle the /support command
  handleSupportCommand(msg) {
    const chatId = msg.chat.id;
    this.bot.sendMessage(chatId, '@tag');
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

  handleSentTheCourse(msg) {
    const chatId = msg.chat.id;

    this.bot.sendMessage(chatId, 'Please enter the course you want to send to the admin:');
    this.isReady = true;
  }

  // Function to handle incoming messages
  handleMessage(msg) {
    const command = msg.text;
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Check if the user has exceeded the request limit
    if (this.isUserRateLimited(userId)) {
      return;
    }

    switch (command) {
      case '/start':
        this.handleStartCommand(msg);
        this.isReady = false;
        break;

      case '📖 Info':
        this.handleHelpCommand(msg);
        this.isReady = false;
        break;

      case '❤️ Help':
        this.handleSupportCommand(msg);
        this.isReady = false;
        break;

      case '👨🏼‍💻 Profile':
        this.handleProfileCommand(msg);
        this.isReady = false;
        break;

      case '📨 Look for':
        this.isReady = true;
        const bookSearch = new BookSearch(this.bot, msg.chat.id, this.isReady);
        bookSearch.askMessage();
        break;

      default:
        if (!this.isReady) {
          this.handleOtherMessages(msg);
        }
        break;
    }
  }

  // Event handler for callback_query
  handleCallbackQuery(callbackQuery) {
    const data = callbackQuery.data;

    // Check if the button "send_to_admin" is pressed
    if (data === 'send_to_admin') {
      // Get the admin chat ID or username
      const adminChatId = 'PRINT_ID_HERE';

      // Send the user's message to the admin
      const userId = callbackQuery.from.id;
      const userMessage = callbackQuery.message.text;
      const adminMessage = `User ID: ${userId}\n${userMessage}`;

      this.bot.sendMessage(adminChatId, adminMessage)
        .then(() => {
          // Respond to the user's button press with a message
          this.bot.answerCallbackQuery(callbackQuery.id, 'Message sent to admin');
        })
        .catch((error) => {
          // Handle any errors that occur during the sending of the message
          console.error('Error sending message to admin:', error.message);
        });
    }
  }
}

module.exports = TelegramBotStart;
