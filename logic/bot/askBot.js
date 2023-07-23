function askMessage(bot, chatId) {
    bot.sendMessage(chatId, 'bot has been started');
  }
  
  module.exports = { askMessage };