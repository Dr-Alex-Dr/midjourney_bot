const axios = require('axios');
const fs = require('fs');

async function DownloadImage(imageUrl, folderPath, nameImg) 
{
  try {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
      console.log(`Папка ${folderPath} успешно создана.`);
    } else {
      
    }
    
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(`${folderPath}/${nameImg}.jpg`);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error('Ошибка при загрузке изображения: ' + error.message);
  }
};

//DownloadImage('https://cdn.discordapp.com/attachments/1042502447282782238/1113137798212497489/Adam_Aushev_start_aa880b0d-c842-4bf1-9739-f0aa317ad73c.png', 'banana red color --v 4 --s 50', 'banana red color --v 4 --s 50 202')
module.exports = { DownloadImage }