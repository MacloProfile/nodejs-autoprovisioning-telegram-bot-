const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

class AskBot {
  constructor(bot, chatId, flag) {
    this.bot = bot;
    this.chatId = chatId;
    this.flag = flag;
  }

  askMessage() {
    this.bot.sendMessage(this.chatId, "I'm waiting for a request");
    this.bot.on('message', this.handleMessage.bind(this));
  }

  response(msg) {
    const text = msg.text;

    // Check if the message is a command to be ignored
    if (this.shouldIgnoreCommand(text)) {
      this.flag = false;
      return;
    }

    // Main logic
    if (this.flag) {
      this.sendResponseMessage(text);
    }
  }

  // Start
  async sendResponseMessage(login) {
    const filePath = 'sourse.txt';

    try {
      const data = await readFileAsync(filePath, 'utf8');

      const lines = data.split('\n');

      const loginAndPassword = lines.find(line => line.startsWith(login + ':'));

      if (!loginAndPassword) {
        this.bot.sendMessage(this.chatId, 'not found');
        return;
      }

      // Separate login and password and look for matches
      const [foundLogin, password] = loginAndPassword.split(':');

      if (foundLogin === login) {
        this.bot.sendMessage(this.chatId, `${password}`);
      } else {
        this.bot.sendMessage(this.chatId, 'not found');
      }
    } catch (err) {
      console.error('Error reading the file:', err);
      this.bot.sendMessage(this.chatId, 'Error reading the file.');
    }
  }

  handleMessage(msg) {
    this.response(msg);
  }

  // Function to check if the message is a command to be ignored
  shouldIgnoreCommand(text) {
    const ignoreCommands = ['/start', '👨🏼‍💻', '❤️', '📖', '🏖'];
    return ignoreCommands.some(cmd => text.startsWith(cmd));
  }
}

module.exports = AskBot;
