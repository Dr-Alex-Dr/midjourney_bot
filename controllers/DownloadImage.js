const axios = require('axios');
const fs = require('fs');
const { GoogleDirve } = require('./GoogleDirve');

async function DownloadImage(imageUrl, folderName, nameImg) {
  try {
    let folderPath = `foldersImages/${folderName}`;
    nameImg = `${nameImg} ${Math.floor(Math.random() * (99999 - 1 + 1)) + 1}`

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Папка ${folderPath} успешно создана.`);
    } 
    
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(`${folderPath}/${nameImg}.jpg`);

    response.data.pipe(writer);

    // проверяем есть ли в папке 4 или более изображений
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Ошибка при чтении папки:', err);
        return;
      }
      if (files.length !== undefined) {
        const fileCount = files.length;
        console.log(`Папка содержит ${fileCount} файла.`);
        if (fileCount == 3) {
          GoogleDirve(folderPath, folderName);
        }     
      }
    });

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error('Ошибка при загрузке изображения: ' + error.message);
  }
};

//DownloadImage('https://cdn.discordapp.com/attachments/1042502447282782238/1115544154433388665/Adam_Aushev_Saint_Petersburg_at_night_cyberpunk_6e05a5e7-046a-41ad-86c2-addeda647b09.png', 'Saint Petersburg at night cyberpunk', 'Saint Petersburg at night cyberpunk')
module.exports = { DownloadImage }