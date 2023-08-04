const { Midjourney } = require('midjourney');
const { DownloadImage } = require('./DownloadImage');
const { ImproveQuality } = require('./ImproveQuality');

async function Imagine(promt, originalPromt, imageSize, bot, chatId) {

  const client = new Midjourney({
    ServerId: '1109153331319935048',
    ChannelId: '1109153331819065394',
    SalaiToken: 'NzA5ODA4ODIyODUxNjAwNDY3.GZPnj_.4ooXVn6ufsswFIjnpJKqPp1t42tVHlv3EX9-ow',
    Debug: false,
  });
  const msg = await client.Imagine(promt,);
  
  if (!msg) {
    console.log("no message");
    return;
  }
  try {
    const msg1 = await client.Upscale({
      index: 1,
      msgId: msg.id,
      hash: msg.hash,
      flags: msg.flags,
      content: msg.content,
    });
    let qualityImg1 = await ImproveQuality(msg1.proxy_url, imageSize);
    await DownloadImage(qualityImg1, originalPromt);
  
    const msg2 = await client.Upscale({
      index: 2,
      msgId: msg.id,
      hash: msg.hash,
      flags: msg.flags,
      content: msg.content,
    });
    let qualityImg2 = await ImproveQuality(msg2.proxy_url, imageSize);
    await DownloadImage(qualityImg2, originalPromt);
   
    const msg3 = await client.Upscale({
      index: 3,
      msgId: msg.id,
      hash: msg.hash,
      flags: msg.flags,
      content: msg.content,
    });
    let qualityImg3 = await ImproveQuality(msg3.proxy_url, imageSize);
    await DownloadImage(qualityImg3, originalPromt);
   
    const msg4 = await client.Upscale({
      index: 4,
      msgId: msg.id,
      hash: msg.hash,
      flags: msg.flags,
      content: msg.content,
    });
    let qualityImg4 = await ImproveQuality(msg4.proxy_url, imageSize);
    await DownloadImage(qualityImg4, originalPromt);
  
    process.env.ACTION_BEING = true;
  }
  catch(error) {
    if (chatId) {
      bot.telegram.sendMessage(chatId, 'Проблемы с обработкой изображений')
    }
    
    console.log('Ошибка генерации изображения: ', error)
    //process.env.ACTION_BEING = true;
  }
}

module.exports = { Imagine }


