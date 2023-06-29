const axios = require('axios');
require('dotenv').config();
const fs = require('fs');
const { GoogleSheets } = require('./GoogleSheets');

async function DownloadImage(imageUrl, nameImg, originalPromt, index) {
  try {
    nameImg = `${nameImg} ${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`
    
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(`foldersImages/${nameImg}.jpg`);

    response.data.pipe(writer);

    let encodedNameImg = encodeURIComponent(nameImg);
    let viewLink = `https://auspersonalproduct.site/foldersImages/${encodedNameImg}.jpg`;
    console.log(viewLink);
    console.log('index ' + index);
    if (index >= 3) {
      process.env.ACTION_BEING = true;
    }

    GoogleSheets([
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt],
      [viewLink, originalPromt]
    ])
    
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error('Ошибка при загрузке изображения: ' + error.message);
  }
};

//DownloadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Moench_2339.jpg/1200px-Moench_2339.jpg', 'Green gold', 'Зеленое золото', 1)
module.exports = { DownloadImage }

