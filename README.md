# nodejs-autoprovisioning-telegram-bot

## Overview

This Telegram bot is designed to provide users with information based on tags from a file. Each tag is associated with specific information that will be displayed to the user. Additionally, the bot allows users to suggest and submit new tags and their corresponding information directly through the bot.

## Features

- View information based on tags from a file.
- Submit new tags and information through the bot.
- User-friendly interface for easy interaction.
- Efficient and fast responses.
- Error handling for unexpected inputs.

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- npm (version X.X.X)
- Telegram account and Telegram Bot API Token

## Usage
1. **`names.txt`**
   - Modify the content in `names.txt` to specify the text that the bot will display to users when they press the "Look for" button. Provide meaningful and helpful information to users in this file.

2. **`sourse.txt`**
   - In `sourse.txt`, add tag and information pairs in the format `tag:information` on separate lines. Each line represents a unique tag and its corresponding information that the bot will display to users upon request.

3. **Admin ID**
   - In the code, replace `'PRINT_ID_HERE'` with the actual ID of the bot's administrator. The admin ID is necessary for the bot to send specific messages or notifications to the designated administrator.

## How to Run the Bot

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/telegram-bot-tag-information.git

2. Install dependencies:

    ```bash
   cd telegram-bot-tag-information
    npm install
   
3. Token:
   Replace `'YOUR_BOT_TOKEN'` in the code with your actual bot token.

4. Start:
    
    ```bash
   npm start
