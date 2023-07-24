const fs = require('fs').promises;

class BookSearch {
  constructor(bot, chatId, flag) {
    this.bot = bot;
    this.chatId = chatId;
    this.flag = flag;
    this.lastUserMessage = '';
  }

  async askMessage() {
    try {
      const textFromFile = await fs.readFile('names.txt', 'utf8');
      if (textFromFile.trim() !== '') {
        this.bot.sendMessage(this.chatId, textFromFile);
      } else {
        this.bot.sendMessage(this.chatId, 'File is empty or contains only whitespace.');
      }
      this.bot.on('message', this.handleMessage.bind(this));
    } catch (err) {
      console.error('Error:', err);
      this.bot.sendMessage(this.chatId, 'Error');
    }
  }

  response(msg) {
    const text = msg.text;

    if (this.shouldIgnoreCommand(text)) {
      this.flag = false;
      return;
    }

    if (this.flag) {
      this.sendResponseMessage(text);
    }
  }

  async sendResponseMessage(login) {
    const filePath = 'sourse.txt';

    try {
      const data = await fs.readFile(filePath, 'utf8');

      const lines = data.split('\n');

      const loginAndPassword = lines.find(line => line.startsWith(login + ':'));

      if (!loginAndPassword) {
        this.lastUserMessage = login;

        this.bot.sendMessage(this.chatId, this.lastUserMessage, {
          reply_markup: {
            inline_keyboard: [
              [{ text: 'Submit to admin', callback_data: 'send_to_admin' }]
            ]
          }
        });
        return;
      }

      const [foundLogin, password] = loginAndPassword.split(':');

      if (foundLogin === login) {
        this.bot.sendMessage(this.chatId, `${password}`);
      } else {
        this.bot.sendMessage(this.chatId, 'Not found');
      }
    } catch (err) {
      console.error('error', err);
      this.bot.sendMessage(this.chatId, 'error');
    }
  }

  handleMessage(msg) {
    this.response(msg);
  }

  shouldIgnoreCommand(text) {
    const ignoreCommands = ['/start', '👨🏼‍💻', '❤️', '🔰', '📨', '📖'];
    return ignoreCommands.some(cmd => text.startsWith(cmd));
  }
}

module.exports = BookSearch;
