require('events').EventEmitter.prototype._maxListeners = 100;

const express = require('express');
const fs = require('fs');
require('dotenv').config();
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const { CleanupText } = require('./controllers/CleanupText');
const { TranslateText } = require('./controllers/TranslateText');
const { Imagine } = require('./controllers/Imagine');
const upscaleInfoBtn = require('./componets/upscaleInfoBtn');

const app = express();

app.use(express.json());

const bot = new Telegraf(process.env.BOT_TOKEN);


function writeToFileSync(filename, text) {
  try {
    fs.appendFileSync(filename, text + '\n');
    console.log('Строка успешно записана в файл.');
  } catch (err) {
    console.error('Ошибка при записи в файл:', err);
  }
}

let requests = [];
let chatId;

async function splitText(text) {
    text = text.split('\n');

    for (let item of text) {
      if (item.length != 0) {
        writeToFileSync('requests.txt', item);
        requests.push(item);
      }
    }
}

bot.command('restart', (ctx) => {
  process.env.ACTION_BEING = true;
});

bot.command('getstatistic', (ctx) => {
  // Установка флага, чтобы не фиксировать следующее сообщение
  ctx.state.ignoreNextMessage = true;

  // Здесь поместите логику для получения статистики
  const statistic = `
  количество сообщений в обработке: ${requests.length}
  `; // Пример ответа со статистикой
  ctx.reply(statistic);
});

bot.command('upscale', (ctx) => {
  // Установка флага, чтобы не фиксировать следующее сообщение
  ctx.state.ignoreNextMessage = true;

  const upscaleInfo = `Текущий коэффициент увеличения ${process.env.UPSCALE}x`; 
  ctx.reply(upscaleInfo, upscaleInfoBtn);
});
bot.action('2x', async (ctx) => {
  console.log('2x');
  process.env.UPSCALE = 2;

  // Установка флага, чтобы не фиксировать следующее сообщение
  ctx.state.ignoreNextMessage = true;

  // Здесь поместите логику для получения статистики
  const upscaleInfo = `
    Текущий коэффициент увеличения ${process.env.UPSCALE}x
  `; // Пример ответа со статистикой
  ctx.reply(upscaleInfo, upscaleInfoBtn);
});

bot.action('4x', async (ctx) => {
  console.log('4x');
  process.env.UPSCALE = 4;

  // Установка флага, чтобы не фиксировать следующее сообщение
  ctx.state.ignoreNextMessage = true;

  // Здесь поместите логику для получения статистики
  const upscaleInfo = `
    Текущий коэффициент увеличения ${process.env.UPSCALE}x
  `; // Пример ответа со статистикой
  ctx.reply(upscaleInfo, upscaleInfoBtn);
});   

bot.on(message('text'), async (ctx) => {
  // собираем информация о чате 
  chatId = ctx.message.chat.id;
  console.log('chatId: ', chatId)
  
  if (ctx.state.ignoreNextMessage) {
    // Сообщение должно быть проигнорировано
    ctx.state.ignoreNextMessage = false; // Сброс флага
    return;
  }

  await splitText(ctx.message.text);
});

setInterval(() => {
  if (requests.length !== 0 && Boolean(process.env.ACTION_BEING)) {
    process.env.ACTION_BEING = '';

    let firstItem = requests.shift();
    TranslateText(firstItem)
    .then(res => {
        console.log(`promt: ${res} original: ${CleanupText(firstItem)}`);
        Imagine(res, CleanupText(firstItem), process.env.UPSCALE, bot, chatId);
    })
  }  

}, 20000);

//https://auspersonalproduct.site/
bot.telegram.setWebhook('https://bdcf-213-109-48-170.ngrok-free.app');

app.use(bot.webhookCallback('/'));

app.listen(3000, 'localhost', () => {
  console.log('Сервер запущен на порту 3000');
});
bot.launch();
//admin-533@midjourney-bot-388312.iam.gserviceaccount.com
