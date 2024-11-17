require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.YOUR_BOT_TOKEN, { 
        polling: true, 
    });
const seenUsers = new Set();
// Respond to the /start command or any message
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    const lastName = msg.from.last_name || '';
    const userId = msg.from.id;
    if (!seenUsers.has(userId)) {
        seenUsers.add(userId);
        
        const welcomeMessage = `
        🌟 Hello, ${firstName} ${lastName ? lastName : ''}!
        
        My name is BE RIGHT, and I'm here to assist you with anything you need. You can ask me questions, get information, or just chat with me anytime! 😊

        How can I help you today?
        `;
        bot.sendMessage(chatId, welcomeMessage);
    } else {
        bot.sendMessage(chatId, "Welcome back! 😊 How can I assist you today?");
    }
});

//commands
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Welcome to my bot! Type anything to interact.');
});

