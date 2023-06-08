require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
let fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);



bot.on(message('text'), async (ctx) => {
    setInterval(() => {
        console.log(ctx.message.text)
    }, 2000)
});

bot.launch();