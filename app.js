require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
let fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

let requests = [];
async function splitText(text) {
    text = text.split('\n');
    for (let item of text) {
        requests.push(item);
    }
}


bot.on(message('text'), async (ctx) => {
    await splitText(ctx.message.text);
    for (let i = 0; i < requests.length; i++)
    {
        await setTimeout(() => {
            console.log(requests[i])
        }, 3000)
    }
});

bot.launch();