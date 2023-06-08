const { Midjourney } = require('midjourney');


//const { DownloadImage } = require('./DownloadImage');

async function GetImages(promt) {
  const client = new Midjourney({
    ChannelId: '1042502447282782238',
    SalaiToken: 'NzA5ODA4ODIyODUxNjAwNDY3.GWCkb8.x2tO9ILRibzqguUl2z6OGoazSxaAskX4BAxHhY',
    Debug: false,
    ws: false
  });

  await client.init();

  const msg = await client.Imagine("a cool cat, blue ears, yellow hat");
  console.log({ msg });

  try {
    let msg1 = await upscaleMessage(client, msg, 1);
    let msg2 = await upscaleMessage(client, msg, 2);
    let msg3 = await upscaleMessage(client, msg, 3);
    let msg4 = await upscaleMessage(client, msg, 4);
 
  } catch (error) {
    console.error(error);
  }
}

//Функция увеличивает изображение
async function upscaleMessage(client, msg, number) {
  return new Promise((resolve, reject) => {
    client.Upscale(
      msg.content,
      number,
      msg.id,
      msg.hash
      )
      .then(resolve)
      .catch(reject);
  });
}

async function removeSpecialCharactersClearText(str) {
  const specialChars = '[+=\\[\\]:*?;«,./\\\\<>|]';
  const regex = new RegExp(specialChars, 'g');
  const cleanedString = str.replace(regex, '');

  const parts = cleanedString.split(':');
  if (parts.length > 1) {
    return parts[0].replace(/ +/g, ' ').trim();
  } else {
    return cleanedString.replace(/ +/g, ' ').trim();
  }
}

async function clearText(str) {
  const specialChars = '[+=\\[\\]:*?;«,./\\\\<>|]';
  const regex = new RegExp(specialChars, 'g');
  const cleanedString = str.replace(regex, '');
  const result = cleanedString.replace(/ +/g, ' ').trim();

  console.log('result', result)
  if (result) {
    return result
  }
}


// module.exports = { GetImages }
GetImages('hot dog')
.catch((err) => {
  console.error(err);
  process.exit(1);
});;