// Function to handle the /help command
function handleHelpCommand(bot, chatId) {
    bot.sendMessage(chatId, 'This is a bot written in JavaScript.');
  }
  
  // Function to handle the /support command
  function handleSupportCommand(bot, chatId) {
    bot.sendMessage(chatId, 'Support');
  }
  
  // Function to handle the /profile command
  function handleProfileCommand(bot, chatId, msg) {
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || 'N/A';
    const username = msg.from.username || 'N/A';
    const userId = msg.from.id;
  
    const profileInfo = `First Name: ${firstName}\nLast Name: ${lastName}\nUsername: ${username}\nUser ID: ${userId}`;
  
    bot.sendMessage(chatId, profileInfo);
  }
  
  module.exports = {
    handleHelpCommand,
    handleSupportCommand,
    handleProfileCommand
  };
  